import { CircleDollarSign, ArrowRight } from "lucide-react"
import Link from "next/link";
export default function Hero() {
    return (
        <div className="bg-[#1a1e2e] py-20 px-6">
            <div className="max-w-4xl mx-auto text-center">
                {/* Decorative Element */}
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#d4b848] opacity-10 rounded-full blur-xl"></div>
                        <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-[#d4b848] opacity-10 rounded-full blur-xl"></div>
                        <CircleDollarSign size={80} className="text-[#d4b848]" />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">SOL WRAPPER</h1>

                {/* Subheading */}
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    Wrap and unwrap your SOL in seconds—unlocking seamless access to the DeFi ecosystem.
                </p>

                {/* CTA Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/swap" className="bg-[#d4b848] hover:bg-[#c5aa3e] text-white font-medium py-3 px-8 rounded-lg transition-colors text-lg flex items-center justify-center gap-2">
                        Start Wrapping
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                    <Link href="/" className="bg-[#262a3e] hover:bg-[#2a2e45] text-gray-200 font-medium py-3 px-8 rounded-lg transition-colors text-lg border border-[#3a3e55]">
                        Learn More
                    </Link>
                </div>
            </div>
        </div >
    )
}

