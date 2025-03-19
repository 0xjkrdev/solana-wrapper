'use client'
import { useEffect, useState } from "react"
import Link from "next/link"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

export default function Navbar() {
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        setIsConnected(true)
    }, [])

    return (
        <nav className="bg-[#1e2235] border-b border-[#2a2e45] py-4 px-6">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo/Brand */}
                <div className="flex items-center">
                    <Link href="/" className="text-xl font-bold text-gray-100">SOL WRAPPER</Link>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-10 text-xl">
                    <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                        Home
                    </Link>
                    <Link href="/swap" className="text-gray-300 hover:text-white transition-colors">
                        Swap
                    </Link>
                    <Link href="/docs" className="text-gray-300 hover:text-white transition-colors">
                        Docs
                    </Link>
                </div>

                {/* Connect Wallet Button */}
                <div>
                    {isConnected && <WalletMultiButton />}
                </div>
            </div>
        </nav>
    )
}

