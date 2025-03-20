"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowRight, RefreshCw } from "lucide-react"
import Image from "next/image"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { Connection, Transaction, LAMPORTS_PER_SOL, SystemProgram, type PublicKey } from "@solana/web3.js"
import {
    createAssociatedTokenAccountInstruction,
    createCloseAccountInstruction,
    createSyncNativeInstruction,
    getAssociatedTokenAddress,
    NATIVE_MINT,
} from "@solana/spl-token"
import { useToast } from "./ToastProvider"
import BlockHeight from "./BlockHeight"

// Constants
const SOLANA_RPC_URL = "https://solana-rpc.publicnode.com"

export default function SolWrapper() {
    const { publicKey, signTransaction, connected } = useWallet()
    const [solBalance, setSolBalance] = useState(0)
    const [wsolBalance, setWsolBalance] = useState(0)
    const [amount, setAmount] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isWrapping, setIsWrapping] = useState(true) // true for wrap, false for unwrap
    const [isRefreshing, setIsRefreshing] = useState(false)
    const { showToast } = useToast()

    // Check if user has sufficient balance
    const hasSufficientBalance = () => {
        if (!amount || isNaN(Number(amount))) return true

        const amountValue = Number(amount)

        if (isWrapping) {
            // For wrapping, check SOL balance (leave 0.01 SOL for fees)
            return amountValue <= solBalance - 0.01
        } else {
            // For unwrapping, check wSOL balance
            return amountValue <= wsolBalance
        }
    }

    // Create a memoized fetchBalances function that doesn't change on every render
    const fetchBalances = useCallback(async () => {
        if (!publicKey) {
            console.log("No public key available, skipping balance fetch")
            return
        }

        try {
            setIsRefreshing(true)
            console.log("Fetching balances for:", publicKey.toString())

            // Create a fresh connection for each balance check to avoid caching issues
            const connection = new Connection(SOLANA_RPC_URL, {
                commitment: "confirmed",
                disableRetryOnRateLimit: false,
            })

            // Get SOL balance with explicit commitment level
            const sol = await connection.getBalance(publicKey, "confirmed")
            console.log("SOL balance fetched:", sol / LAMPORTS_PER_SOL)
            setSolBalance(sol / LAMPORTS_PER_SOL)

            // Get wSOL balance
            const wsolTokenAccount = await getAssociatedTokenAddress(NATIVE_MINT, publicKey)

            try {
                const tokenAccountInfo = await connection.getTokenAccountBalance(wsolTokenAccount, "confirmed")
                const wsolAmount = Number(tokenAccountInfo.value.amount) / LAMPORTS_PER_SOL
                console.log("wSOL balance fetched:", wsolAmount)
                setWsolBalance(wsolAmount)
            } catch (e) {
                // Token account might not exist yet
                console.log("wSOL token account not found or error:", e)
                setWsolBalance(0)
            }
        } catch (error) {
            console.error("Error fetching balances:", error)
            showToast("Failed to fetch balances", "error")
        } finally {
            setIsRefreshing(false)
        }
    }, [publicKey, showToast])

    // Effect to fetch balances when wallet connects
    useEffect(() => {
        if (connected && publicKey) {
            fetchBalances()
        } else {
            // Reset balances if wallet disconnects
            setSolBalance(0)
            setWsolBalance(0)
        }
    }, [connected, publicKey, fetchBalances])

    // Set up periodic refresh
    useEffect(() => {
        let intervalId: NodeJS.Timeout

        if (connected && publicKey) {
            // Set up interval to refresh balances every 15 seconds
            intervalId = setInterval(() => {
                fetchBalances()
            }, 15000)
        }

        return () => {
            if (intervalId) clearInterval(intervalId)
        }
    }, [connected, publicKey, fetchBalances])

    const handleTransaction = async (isWrapping: boolean) => {
        if (!publicKey || !signTransaction) return

        try {
            setIsLoading(true)

            // Create a fresh connection for the transaction
            const connection = new Connection(SOLANA_RPC_URL, {
                commitment: "confirmed",
                disableRetryOnRateLimit: false,
            })

            if (isWrapping) {
                await wrapSol(connection, publicKey, signTransaction)
            } else {
                await unwrapSol(connection, publicKey, signTransaction)
            }

            // Clear input
            setAmount("")

            // Aggressively refresh balances multiple times after transaction
            // First immediate refresh
            await fetchBalances()

            // Then after 2 seconds
            setTimeout(async () => {
                await fetchBalances()

                // And again after 5 seconds
                setTimeout(async () => {
                    await fetchBalances()
                }, 3000)
            }, 2000)
        } catch (error) {
            console.error(`Error ${isWrapping ? "wrapping" : "unwrapping"}:`, error)
            showToast(`Failed to ${isWrapping ? "wrap SOL" : "unwrap wSOL"}`, "error")
        } finally {
            setIsLoading(false)
        }
    }

    const wrapSol = async (
        connection: Connection,
        publicKey: PublicKey,
        signTransaction: (transaction: Transaction) => Promise<Transaction>,
    ) => {
        const amountToWrap = Number.parseFloat(amount) * LAMPORTS_PER_SOL

        // Create associated token account for wSOL if it doesn't exist
        const associatedTokenAccount = await getAssociatedTokenAddress(NATIVE_MINT, publicKey)

        const transaction = new Transaction()

        // Check if the token account exists
        const tokenAccountInfo = await connection.getAccountInfo(associatedTokenAccount)

        if (!tokenAccountInfo) {
            transaction.add(
                createAssociatedTokenAccountInstruction(publicKey, associatedTokenAccount, publicKey, NATIVE_MINT),
            )
        }

        // Transfer SOL to the associated token account
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: associatedTokenAccount,
                lamports: amountToWrap,
            }),
        )

        // Sync native instruction to update the token account
        transaction.add(createSyncNativeInstruction(associatedTokenAccount))

        // Sign and send transaction
        transaction.feePayer = publicKey
        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
        transaction.recentBlockhash = blockhash

        const signedTransaction = await signTransaction(transaction)
        const txid = await connection.sendRawTransaction(signedTransaction.serialize(), {
            skipPreflight: false,
            preflightCommitment: "confirmed",
        })

        // Wait for confirmation with explicit parameters
        const confirmation = await connection.confirmTransaction(
            {
                signature: txid,
                blockhash,
                lastValidBlockHeight,
            },
            "confirmed",
        )

        if (confirmation.value.err) {
            throw new Error(`Transaction failed: ${confirmation.value.err.toString()}`)
        }

        showToast(`Successfully wrapped ${amount} SOL to wSOL`, "success")
    }

    const unwrapSol = async (
        connection: Connection,
        publicKey: PublicKey,
        signTransaction: (transaction: Transaction) => Promise<Transaction>,
    ) => {
        // Get associated token account for wSOL
        const associatedTokenAccount = await getAssociatedTokenAddress(NATIVE_MINT, publicKey)

        // Create close account instruction to unwrap wSOL back to SOL
        const transaction = new Transaction().add(
            // This will close the account and send the SOL back to the owner
            createCloseAccountInstruction(associatedTokenAccount, publicKey, publicKey, []),
        )

        // Sign and send transaction
        transaction.feePayer = publicKey
        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
        transaction.recentBlockhash = blockhash

        const signedTransaction = await signTransaction(transaction)
        const txid = await connection.sendRawTransaction(signedTransaction.serialize(), {
            skipPreflight: false,
            preflightCommitment: "confirmed",
        })

        // Wait for confirmation with explicit parameters
        const confirmation = await connection.confirmTransaction(
            {
                signature: txid,
                blockhash,
                lastValidBlockHeight,
            },
            "confirmed",
        )

        if (confirmation.value.err) {
            throw new Error(`Transaction failed: ${confirmation.value.err.toString()}`)
        }

        showToast(`Successfully unwrapped ${amount} wSOL to SOL`, "success")
    }

    const handleSetHalf = () => {
        if (isWrapping) {
            setAmount((solBalance / 2).toFixed(9))
        } else {
            setAmount((wsolBalance / 2).toFixed(9))
        }
    }

    const handleSetMax = () => {
        if (isWrapping) {
            // Leave some SOL for transaction fees
            const maxAmount = Math.max(0, solBalance - 0.01)
            setAmount(maxAmount.toFixed(9))
        } else {
            setAmount(wsolBalance.toFixed(9))
        }
    }

    const toggleMode = () => {
        setIsWrapping(!isWrapping)
        setAmount("")
    }

    // Get button text based on state
    const getButtonText = () => {
        if (isLoading) {
            return null // Will show spinner
        }

        if (!hasSufficientBalance() && amount) {
            return "INSUFFICIENT BALANCE"
        }

        return isWrapping ? "Wrap SOL" : "Unwrap wSOL"
    }

    return (
        <div className="bg-[#1a1e2e] py-20 px-6 flex justify-center">
            <div className="w-full max-w-md bg-[#1e2235] rounded-xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b border-[#2a2e45]">
                    <h2 className="text-xl font-semibold text-gray-200">Your SOL / wSOL</h2>
                    <BlockHeight />
                </div>

                {/* Balances with refresh button */}
                <div className="p-5">
                    <div className="flex justify-between items-center mb-2">
                        <div className="text-gray-300">Balances</div>
                        <button
                            onClick={() => fetchBalances()}
                            disabled={isRefreshing}
                            className="text-gray-400 hover:text-white flex items-center"
                        >
                            <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? "animate-spin" : ""}`} />
                            <span className="text-sm">Refresh</span>
                        </button>
                    </div>
                    <div className="flex">
                        <div className="flex-1 bg-[#262a3e] p-4 rounded-l-lg">
                            <div className="text-gray-400 mb-1">SOL</div>
                            <div className="text-2xl font-bold text-white">{solBalance.toFixed(4)}</div>
                        </div>
                        <div className="flex-1 bg-[#2a2e45] p-4 rounded-r-lg">
                            <div className="text-gray-400 mb-1">wSOL</div>
                            <div className="text-2xl font-bold text-white">{wsolBalance.toFixed(4)}</div>
                        </div>
                    </div>
                </div>

                {/* Wrap/Unwrap Form */}
                <div className="px-5 pb-5">
                    <div className="flex justify-between items-center mb-2">
                        <div className="text-gray-300">You {isWrapping ? "wrap" : "unwrap"}</div>
                        <div className="text-gray-400">
                            Balance {isWrapping ? solBalance.toFixed(2) : wsolBalance.toFixed(2)} {isWrapping ? "SOL" : "wSOL"}
                            <button
                                onClick={handleSetHalf}
                                className="ml-2 bg-gray-600 hover:bg-gray-500 text-white text-xs py-1 px-2 rounded-md"
                            >
                                HALF
                            </button>
                            <button
                                onClick={handleSetMax}
                                className="ml-2 bg-gray-600 hover:bg-gray-500 text-white text-xs py-1 px-2 rounded-md"
                            >
                                MAX
                            </button>
                        </div>
                    </div>

                    {/* Input */}
                    <div className="bg-[#262a3e] rounded-lg p-3 mb-4">
                        <div className="flex items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-[#1e2235] flex items-center justify-center">
                                    <Image
                                        src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=040"
                                        alt="SOL"
                                        width={20}
                                        height={20}
                                        className="rounded-full"
                                    />
                                </div>
                                <span className="text-white font-medium">{isWrapping ? "SOL" : "wSOL"}</span>
                            </div>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.0"
                                className="ml-auto bg-transparent text-right text-white text-xl outline-none w-1/2"
                            />
                        </div>
                    </div>

                    {/* Action Button */}
                    {!connected ? (
                        <div className="flex justify-center">
                            <WalletMultiButton />
                        </div>
                    ) : (
                        <button
                            onClick={() => handleTransaction(isWrapping)}
                            disabled={isLoading || !amount || Number.parseFloat(amount) <= 0 || !hasSufficientBalance()}
                            className={`w-full py-4 rounded-lg font-medium flex items-center justify-center transition-colors ${!hasSufficientBalance() && amount
                                ? "bg-red-500 hover:bg-red-600 text-white cursor-not-allowed"
                                : "bg-[#d4b848] hover:bg-[#c5aa3e] text-white disabled:bg-gray-600 disabled:cursor-not-allowed"
                                }`}
                        >
                            {isLoading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                                getButtonText()
                            )}
                        </button>
                    )}

                    {/* Toggle Mode */}
                    <button
                        onClick={toggleMode}
                        className="w-full mt-3 py-2 text-[#d4b848] hover:text-[#c5aa3e] font-medium flex items-center justify-center"
                    >
                        Switch to {isWrapping ? "Unwrap" : "Wrap"} <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

