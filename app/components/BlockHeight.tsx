"use client"

import { useState, useEffect } from "react"
import { Connection } from "@solana/web3.js"

export default function BlockHeight() {
    const [blockHeight, setBlockHeight] = useState<number | null>(null)

    useEffect(() => {
        const connection = new Connection("https://solana-rpc.publicnode.com")

        const fetchBlockHeight = async () => {
            try {
                const slot = await connection.getSlot()
                setBlockHeight(slot)
            } catch (error) {
                console.error("Error fetching block height:", error)
            }
        }

        // Fetch immediately
        fetchBlockHeight()

        // Then fetch every 10 seconds
        const interval = setInterval(fetchBlockHeight, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex items-center space-x-2">
            <div className="relative flex items-center">
                <span className="absolute inline-flex w-2 h-2 bg-green-400 rounded-full opacity-75 animate-ping"></span>
                <span className="relative inline-flex w-2 h-2 bg-green-500 rounded-full"></span>
            </div>
            <span className="text-gray-400 text-sm">Block {blockHeight ? blockHeight.toLocaleString() : "Loading..."}</span>
        </div>
    )
}

