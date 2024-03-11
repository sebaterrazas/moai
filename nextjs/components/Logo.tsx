import Image from 'next/image'
import moai from '@/public/icon.png'
import { Irish_Grover } from 'next/font/google'

const irish_grover = Irish_Grover({
    subsets: ["latin"],
    weight: ["400"]
})


export default function Logo() {
    return (
        <div
            className="inline-flex items-center justify-center gap-1 px-2 text-foreground rounded-lg flex-row"
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
        </div>
    )
}