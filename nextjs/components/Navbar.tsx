'use client';

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { Irish_Grover } from 'next/font/google'
import { SiGithub as Github, SiDiscord as Discord } from 'react-icons/si'
import { FaFileUpload } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";

import moai from '@/public/icon.png'
import AuthButton from './AuthButton'

const irish_grover = Irish_Grover({
    subsets: ["latin"],
    weight: ["400"]
})

export const Navbar = ({user} : {user?: any}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
    <nav className="flex justify-center border-r border-r-foreground/10">
        <div className="w-full h-full flex flex-col justify-start items-center p-3 text-sm gap-10">
            <button
                className="inline-flex items-center justify-center gap-1 px-2 text-text rounded-lg hover:scale-110 transition-transform flex-col"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <h1 className="sr-only">Moais Marauders</h1>
                <Image
                    src={moai}
                    width={60}
                    height={60}
                    alt="Icon of a Moai head"
                />

                {isMenuOpen && 
                    <div className={"flex flex-col items-center " + irish_grover.className}>
                        <span>Moais</span>
                        <span>Marauders</span>
                    </div>
                }
            </button>

            <div>
                <a href="/create-album/" rel="noopener noreferrer">
                <MdCreateNewFolder className="text-2xl transition-transform focus:scale-125 hover:scale-125" />
                </a>
            </div>
            <div>
                <a href="/upload-file/" rel="noopener noreferrer">
                <FaFileUpload className="text-2xl transition-transform focus:scale-125 hover:scale-125" />
                </a>
            </div>
            <div>
                <AuthButton user={user}/>
            </div>
        </div>
    </nav>
)}
