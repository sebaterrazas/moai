import Image from 'next/image'
import Link from 'next/link'
import { Irish_Grover } from 'next/font/google'
import { SiGithub as Github, SiDiscord as Discord } from 'react-icons/si'
import { FaFileUpload } from "react-icons/fa";

import moai from '@/public/icon.png'
import AuthButton from './AuthButton'

const irish_grover = Irish_Grover({
    subsets: ["latin"],
    weight: ["400"]
})

export const TopNav = () => {
    return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <Link
                href="/"
                className="inline-flex items-center justify-center h-10 gap-1 px-2 text-text rounded-lg hover:scale-110 transition-transform"
            >
                <h1 className="sr-only">Moais Marauders</h1>
                <Image
                    src={moai}
                    // width={60}
                    height={60}
                    alt="Icon of a Moai head"
                />
                <div className={"flex flex-col " + irish_grover.className}>
                    <span>Moais</span>
                    <span>Marauders</span>
                </div>
            </Link>

            <ul className="flex items-center gap-4 text-sm font-medium text-text">
            <li>
                <a href="/upload-file/" rel="noopener noreferrer">
                <FaFileUpload className="text-2xl transition-transform focus:scale-125 hover:scale-125" />
                </a>
            </li>

            <li>
                <AuthButton />
            </li>
            </ul>
        </div>
    </nav>
)}
