import { Heart } from "lucide-react"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-[#1e2235] border-t border-[#2a2e45] py-8 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Made with love section */}
                    <div className="flex items-center mb-6 md:mb-0">
                        <span className="text-gray-300">Made with</span>
                        <Heart className="h-5 w-5 mx-1 text-red-500 fill-red-500" />
                        <span className="text-gray-300">by</span>
                        <Link
                            href="https://github.com/0xjkrdev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#d4b848] hover:text-[#c5aa3e] ml-1 font-medium transition-colors"
                        >
                            0xjkrdev
                        </Link>
                    </div>
                    <div className="text-center text-gray-500 text-sm">
                        <p>© {new Date().getFullYear()} SOL Wrapper. All rights reserved.</p>
                    </div>
                    {/* Technologies */}
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center">
                            <span className="text-gray-400 mr-2">Powered by:</span>

                            {/* Next.js Logo */}
                            <Link
                                href="https://nextjs.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center mr-4 hover:opacity-80 transition-opacity"
                            >
                                <svg
                                    height="20"
                                    viewBox="0 0 180 180"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-white"
                                >
                                    <mask
                                        id="mask0_408_139"
                                        style={{ maskType: "alpha" }}
                                        maskUnits="userSpaceOnUse"
                                        x="0"
                                        y="0"
                                        width="180"
                                        height="180"
                                    >
                                        <circle cx="90" cy="90" r="90" fill="black" />
                                    </mask>
                                    <g mask="url(#mask0_408_139)">
                                        <circle cx="90" cy="90" r="90" fill="black" />
                                        <path
                                            d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
                                            fill="url(#paint0_linear_408_139)"
                                        />
                                        <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_408_139)" />
                                    </g>
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear_408_139"
                                            x1="109"
                                            y1="116.5"
                                            x2="144.5"
                                            y2="160.5"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="white" />
                                            <stop offset="1" stopColor="white" stopOpacity="0" />
                                        </linearGradient>
                                        <linearGradient
                                            id="paint1_linear_408_139"
                                            x1="121"
                                            y1="54"
                                            x2="120.799"
                                            y2="106.875"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="white" />
                                            <stop offset="1" stopColor="white" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </Link>
                        </div>

                        {/* GitHub Link */}
                        <Link
                            href="https://github.com/0xjkrdev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </Link>
                    </div>
                </div>


            </div>
        </footer>
    )
}

