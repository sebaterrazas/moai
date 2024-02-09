'use client';

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { Irish_Grover } from 'next/font/google'
import { SiGithub as Github, SiDiscord as Discord } from 'react-icons/si'
import { FaFileUpload } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

import moai from '@/public/icon.png'

const irish_grover = Irish_Grover({
    subsets: ["latin"],
    weight: ["400"]
})

export const Navbar = ({user} : {user?: any}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
    <nav>
        {false ?
            <button
                className="items-center justify-center bg-background p-1 m-3 text-2xl text-text rounded-xl hover:scale-110 transition-transform"
                onClick={() => setIsMenuOpen(true)}
            >
                <GiHamburgerMenu />
            </button>
            :
            <div className="bg-background rounded-lg w-full h-full flex flex-col justify-start items-center p-3 pb-5 text-sm gap-10 animate-in">
                <button
                    className="inline-flex items-center justify-center gap-1 px-2 text-text rounded-lg hover:scale-110 transition-transform flex-row"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <h1 className="sr-only">Moais Marauders</h1>
                    <Image
                        src={moai}
                        width={60}
                        height={60}
                        alt="Icon of a Moai head"
                    />
                    <div className={"flex flex-col items-center " + irish_grover.className}>
                        <span>Moais</span>
                        <span>Marauders</span>
                    </div>
                </button>

                <div className="flex flex-row w-full justify-around">
                    <a href="/upload-file/" rel="noopener noreferrer">
                    <FaFileUpload className="text-2xl transition-transform focus:scale-125 hover:scale-125" />
                    </a>

                    <a href="/create-album/" rel="noopener noreferrer">
                    <MdCreateNewFolder className="text-3xl transition-transform focus:scale-125 hover:scale-125" />
                    </a>
                </div>
            </div>
        }
    </nav>
)}
