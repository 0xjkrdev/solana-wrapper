'use client'

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { Connection, Transaction, LAMPORTS_PER_SOL, SystemProgram } from "@solana/web3.js"
import {
    createAssociatedTokenAccountInstruction,
    createCloseAccountInstruction,
    createSyncNativeInstruction,
    getAssociatedTokenAddress,
    NATIVE_MINT,
} from "@solana/spl-token"

// Constants
const SOLANA_RPC_URL = "https://solana-rpc.publicnode.com"

export default function SolWrapper() {
    const { publicKey, signTransaction, connected } = useWallet()
    const [solBalance, setSolBalance] = useState(0)
    const [wsolBalance, setWsolBalance] = useState(0)
    const [amount, setAmount] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isWrapping, setIsWrapping] = useState(true) // true for wrap, false for unwrap

    // Initialize connection
    const connection = new Connection(SOLANA_RPC_URL)

    useEffect(() => {
        if (connected && publicKey) {
            fetchBalances()
        }
    }, [connected, publicKey])

    const fetchBalances = async () => {
        console.log(publicKey);
        if (!publicKey) return

        try {
            // Get SOL balance
            const sol = await connection.getBalance(publicKey)
            setSolBalance(sol / LAMPORTS_PER_SOL)

            // Get wSOL balance
            const wsolTokenAccount = await getAssociatedTokenAddress(NATIVE_MINT, publicKey)

            try {
                const tokenAccountInfo = await connection.getTokenAccountBalance(wsolTokenAccount)
                setWsolBalance(Number(tokenAccountInfo.value.amount) / LAMPORTS_PER_SOL)
            } catch (e) {
                // Token account might not exist yet
                setWsolBalance(0)
            }
        } catch (error) {
            console.error("Error fetching balances:", error)
        }
    }

    const handleWrapSol = async () => {
        if (!publicKey || !signTransaction) return

        try {
            setIsLoading(true)
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
            transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

            const signedTransaction = await signTransaction(transaction)
            const txid = await connection.sendRawTransaction(signedTransaction.serialize())

            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
            await connection.confirmTransaction(
                { signature: txid, blockhash, lastValidBlockHeight },
                "confirmed"
            );

            // Refresh balances
            await fetchBalances()
            setAmount("")
        } catch (error) {
            console.error("Error wrapping SOL:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleUnwrapSol = async () => {
        if (!publicKey || !signTransaction) return
        try {
            setIsLoading(true)
            const amountToUnwrap = Number.parseFloat(amount) * LAMPORTS_PER_SOL

            // Get associated token account for wSOL
            const associatedTokenAccount = await getAssociatedTokenAddress(NATIVE_MINT, publicKey)

            // Create close account instruction to unwrap wSOL back to SOL
            const transaction = new Transaction().add(
                // This will close the account and send the SOL back to the owner
                createCloseAccountInstruction(associatedTokenAccount, publicKey, publicKey, []),
            )

            // Sign and send transaction
            transaction.feePayer = publicKey
            transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

            const signedTransaction = await signTransaction(transaction)
            const txid = await connection.sendRawTransaction(signedTransaction.serialize())

            await connection.confirmTransaction(txid)

            // Refresh balances
            await fetchBalances()
            setAmount("")
        } catch (error) {
            console.error("Error unwrapping wSOL:", error)
        } finally {
            setIsLoading(false)
        }
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

    return (
        <div className="bg-[#1a1e2e] py-20 px-6 flex justify-center">
            <div className="w-full max-w-md bg-[#1e2235] rounded-xl shadow-2xl overflow-hidden ">
                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b border-[#2a2e45]">
                    <h2 className="text-xl font-semibold text-gray-200">Your SOL / wSOL</h2>
                </div>
                {/* Balances */}
                <div className="flex p-5">
                    <div className="flex-1 bg-[#262a3e] p-4 rounded-l-lg">
                        <div className="text-gray-400 mb-1">SOL</div>
                        <div className="text-2xl font-bold text-white">{solBalance.toFixed(4)}</div>
                    </div>
                    <div className="flex-1 bg-[#2a2e45] p-4 rounded-r-lg">
                        <div className="text-gray-400 mb-1">wSOL</div>
                        <div className="text-2xl font-bold text-white">{wsolBalance.toFixed(4)}</div>
                    </div>
                </div>

                {/* Wrap/Unwrap Form */}
                <div className="p-5">
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
                        <div className="flex justify-center" >
                            <WalletMultiButton />
                        </div>
                    ) : (
                        <button
                            onClick={isWrapping ? handleWrapSol : handleUnwrapSol}
                            disabled={isLoading || !amount || Number.parseFloat(amount) <= 0}
                            className="w-full py-4 rounded-lg bg-[#d4b848] hover:bg-[#c5aa3e] text-white font-medium disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                                <>{isWrapping ? "Wrap SOL" : "Unwrap wSOL"}</>
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

