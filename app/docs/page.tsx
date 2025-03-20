import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-[#1a1e2e] flex flex-col">

            <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold text-white mb-8">SOL Wrapper Documentation</h1>

                <div className="space-y-12">
                    {/* Introduction */}
                    <section className="bg-[#1e2235] rounded-lg p-6 shadow-lg">
                        <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
                        <p className="text-gray-300 mb-4">
                            SOL Wrapper is a simple tool that allows you to wrap your SOL tokens into wSOL (Wrapped SOL) and unwrap
                            them back to SOL. This is useful for interacting with DeFi protocols on Solana that require SPL tokens.
                        </p>
                        <p className="text-gray-300">
                            Wrapped SOL (wSOL) is the SPL token version of native SOL. It follows the SPL token standard, making it
                            compatible with all applications that work with SPL tokens on Solana.
                        </p>
                    </section>

                    {/* Why Wrap SOL? */}
                    <section className="bg-[#1e2235] rounded-lg p-6 shadow-lg">
                        <h2 className="text-2xl font-semibold text-white mb-4">Why Wrap SOL?</h2>
                        <p className="text-gray-300 mb-4">
                            Native SOL is the blockchain's currency used for transaction fees and staking. However, many DeFi
                            applications on Solana require tokens to follow the SPL token standard for compatibility with their
                            protocols.
                        </p>
                        <p className="text-gray-300 mb-4">By wrapping SOL into wSOL, you can:</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                            <li>Use your SOL in DeFi applications that only accept SPL tokens</li>
                            <li>Trade SOL on decentralized exchanges that use token pairs</li>
                            <li>Provide liquidity to pools that require SPL tokens</li>
                            <li>Interact with smart contracts that expect SPL token interfaces</li>
                        </ul>
                        <p className="text-gray-300">You can always unwrap your wSOL back to native SOL when needed.</p>
                    </section>

                    {/* How to Use */}
                    <section className="bg-[#1e2235] rounded-lg p-6 shadow-lg">
                        <h2 className="text-2xl font-semibold text-white mb-4">How to Use SOL Wrapper</h2>

                        <div className="mb-6">
                            <h3 className="text-xl font-medium text-white mb-3">Wrapping SOL to wSOL</h3>
                            <ol className="list-decimal list-inside text-gray-300 space-y-2">
                                <li>Connect your Solana wallet by clicking the "Connect Wallet" button</li>
                                <li>Ensure you have SOL in your wallet</li>
                                <li>Enter the amount of SOL you want to wrap, or use the "HALF" or "MAX" buttons</li>
                                <li>Click the "Wrap SOL" button</li>
                                <li>Approve the transaction in your wallet</li>
                                <li>Wait for the transaction to be confirmed</li>
                            </ol>
                        </div>

                        <div>
                            <h3 className="text-xl font-medium text-white mb-3">Unwrapping wSOL to SOL</h3>
                            <ol className="list-decimal list-inside text-gray-300 space-y-2">
                                <li>Connect your Solana wallet by clicking the "Connect Wallet" button</li>
                                <li>Click "Switch to Unwrap" to change to unwrap mode</li>
                                <li>Enter the amount of wSOL you want to unwrap, or use the "HALF" or "MAX" buttons</li>
                                <li>Click the "Unwrap wSOL" button</li>
                                <li>Approve the transaction in your wallet</li>
                                <li>Wait for the transaction to be confirmed</li>
                            </ol>
                        </div>
                    </section>

                    {/* Technical Details */}
                    <section className="bg-[#1e2235] rounded-lg p-6 shadow-lg">
                        <h2 className="text-2xl font-semibold text-white mb-4">Technical Details</h2>
                        <p className="text-gray-300 mb-4">
                            SOL Wrapper interacts with the Solana blockchain using the following libraries:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                            <li>@solana/web3.js - Core Solana blockchain interaction</li>
                            <li>@solana/spl-token - SPL token program interaction</li>
                            <li>@solana/wallet-adapter - Wallet connection and transaction signing</li>
                        </ul>
                        <p className="text-gray-300 mb-4">When wrapping SOL, the application:</p>
                        <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-4">
                            <li>Creates an associated token account for wSOL if it doesn't exist</li>
                            <li>Transfers SOL to the token account</li>
                            <li>Syncs the native account to update the token balance</li>
                        </ol>
                        <p className="text-gray-300 mb-4">When unwrapping wSOL, the application:</p>
                        <ol className="list-decimal list-inside text-gray-300 space-y-2">
                            <li>Closes the token account</li>
                            <li>Returns the SOL to your wallet</li>
                        </ol>
                    </section>

                    {/* FAQ */}
                    <section className="bg-[#1e2235] rounded-lg p-6 shadow-lg">
                        <h2 className="text-2xl font-semibold text-white mb-4">Frequently Asked Questions</h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">Are there any fees for wrapping/unwrapping SOL?</h3>
                                <p className="text-gray-300">
                                    There are no fees charged by SOL Wrapper itself. However, you will need to pay the standard Solana
                                    network transaction fees, which are typically a fraction of a SOL.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">Is wSOL the same value as SOL?</h3>
                                <p className="text-gray-300">
                                    Yes, wSOL is always valued 1:1 with SOL. When you wrap SOL, you get the exact same amount in wSOL, and
                                    vice versa when unwrapping.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">Why do I need to leave some SOL when wrapping?</h3>
                                <p className="text-gray-300">
                                    You need to keep a small amount of SOL in your wallet to pay for transaction fees. The "MAX" button
                                    automatically reserves 0.01 SOL for this purpose.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">Can I send wSOL to another wallet?</h3>
                                <p className="text-gray-300">
                                    Yes, wSOL is an SPL token that can be sent to any Solana wallet address. The receiving wallet must
                                    have an associated token account for wSOL.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">What wallets are supported?</h3>
                                <p className="text-gray-300">
                                    SOL Wrapper supports popular Solana wallets including Phantom, Solflare, and other wallets compatible
                                    with the Solana wallet adapter.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Get Help */}
                    <section className="bg-[#1e2235] rounded-lg p-6 shadow-lg">
                        <h2 className="text-2xl font-semibold text-white mb-4">Get Help</h2>
                        <p className="text-gray-300 mb-4">If you encounter any issues or have questions, you can:</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>Report a bug using the bug report button at the bottom right of the page</li>
                            <li>Request a new feature using the feature request button</li>
                            <li>
                                Visit our{" "}
                                <Link href="https://github.com/0xjkrdev" className="text-[#d4b848] hover:underline">
                                    GitHub repository
                                </Link>{" "}
                                for more information
                            </li>
                        </ul>
                    </section>
                </div>

                <div className="mt-10 text-center">
                    <Link
                        href="/swap"
                        className="inline-block bg-[#d4b848] hover:bg-[#c5aa3e] text-white font-medium py-3 px-8 rounded-lg transition-colors text-lg"
                    >
                        Start Wrapping SOL
                        <ArrowRight className="h-5 w-5  ml-2 inline" />
                    </Link>
                </div>
            </main>

        </div>
    )
}

