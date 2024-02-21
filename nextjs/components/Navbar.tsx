'use client';

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { Irish_Grover } from 'next/font/google'
import { SiGithub as Github, SiDiscord as Discord } from 'react-icons/si'
import { FaFileUpload } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosAlbums } from "react-icons/io";

import moai from '@/public/icon.png'
import UploadFiles from './UploadFiles';

const irish_grover = Irish_Grover({
    subsets: ["latin"],
    weight: ["400"]
})

export default ({ isLoading, files, setFiles, setPopUp } : {isLoading?: boolean, files: any[], setFiles: Function, setPopUp: Function }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
    <nav>
        {false ?
            <button
                className="items-center justify-center bg-background p-1 m-3 text-2xl text-foreground rounded-xl hover:scale-110 transition-transform"
                onClick={() => setIsMenuOpen(true)}
            >
                <GiHamburgerMenu />
            </button>
            :
            <div className={"bg-background flex flex-col items-center text-sm gap-10 rounded-lg transition-all duration-300 " + (isLoading ? "h-screen w-screen justify-center" : "h-full w-full justify-start p-3 pb-5")}>
                <button
                    className="inline-flex items-center justify-center gap-1 px-2 text-foreground rounded-lg hover:scale-110 transition-transform flex-row"
                    onClick={() => null }
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

                { !isLoading &&
                    <div className="flex flex-row w-full justify-around">
                        <UploadFiles files={files} setFiles={setFiles} setUploadMsg={setPopUp} />
                        {/* <a href="/album/create/" rel="noopener noreferrer">
                            <MdCreateNewFolder className="text-3xl transition-transform focus:scale-125 hover:scale-125" />
                        </a> */}
                        <a href="/gallery" rel="noopener noreferrer">
                            <IoIosAlbums className="text-3xl transition-transform focus:scale-125 hover:scale-125" />
                        </a>
                    </div>
                }
            </div>
        }
    </nav>
)}
