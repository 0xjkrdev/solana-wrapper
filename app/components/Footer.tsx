import { Heart } from "lucide-react"
import Link from "next/link"
import { AiFillGithub } from 'react-icons/ai'
import { TbBrandNextjs } from 'react-icons/tb'
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
                    <div className="flex items-center">
                        <div className="flex items-center mr-2">
                            <span className="text-gray-400 mr-2">Built with</span>

                            {/* Next.js Logo */}
                            <Link
                                href="https://nextjs.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center hover:opacity-80 transition-opacity"
                            >
                                <TbBrandNextjs size={30} />
                            </Link>
                        </div>

                        {/* GitHub Link */}
                        <Link
                            href="https://github.com/0xjkrdev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            <AiFillGithub size={30} />
                        </Link>
                    </div>
                </div>


            </div>
        </footer>
    )
}

