'use client'

import { useEffect, useState } from "react"

export default function Loading() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0
                }
                const diff = Math.random() * 10
                return Math.min(oldProgress + diff, 100)
            })
        }, 100)

        return () => {
            clearTimeout(timer)
        }
    }, [progress])

    return (
        <div className="fixed inset-0 bg-[#1a1e2e] flex flex-col items-center justify-center z-50">
            <div className="w-64 h-64 relative mb-8">
                <div className="absolute inset-0 rounded-full border-4 border-[#2a2e45]"></div>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <circle
                        className="text-[#d4b848]"
                        strokeWidth="4"
                        stroke="currentColor"
                        fill="transparent"
                        r="48"
                        cx="50"
                        cy="50"
                        style={{
                            strokeDasharray: 301.59,
                            strokeDashoffset: 301.59 - (progress / 100) * 301.59,
                            transition: "stroke-dashoffset 0.35s ease-in-out",
                        }}
                        transform="rotate(-90 50 50)"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">{Math.round(progress)}%</span>
                </div>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">Loading SOL Wrapper</h2>
            <p className="text-gray-400">Please wait while we prepare your experience</p>
        </div>
    )
}

