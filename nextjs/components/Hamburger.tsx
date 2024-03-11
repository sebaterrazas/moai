import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    ButtonGroup,
    IconButton,
    Stack,
    Text
} from '@chakra-ui/react'

import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { TbWorld } from "react-icons/tb";

import { GiHamburgerMenu } from "react-icons/gi";

import { IoIosAlbums } from "react-icons/io";
import UploadFiles from './UploadFiles';
import Logo from './Logo';

export default function Hamburger() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    return (
      <>
        <GiHamburgerMenu 
            className="absolute top-5 left-4 w-5 h-5 text-gray-600 cursor-pointer transition-transform focus:scale-125 hover:scale-125"
            onClick={onOpen}
            aria-label='Open menu'
        />
        <Drawer
          isOpen={isOpen}
          placement='left'
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
                <Logo />
            </DrawerHeader>
            <DrawerBody>
                <Stack spacing='24px'>
                    <UploadFiles />
                    <a className="flex flex-row gap-4 p-2 hover:bg-highlight focus:bg-highlight" href="/albums" rel="noopener noreferrer">
                        <Text>View Albums</Text>
                        <IoIosAlbums className="text-3xl transition-transform focus:scale-125 hover:scale-125" />
                    </a>
                </Stack>
            </DrawerBody>
  
            <DrawerFooter>
                <Stack className="w-full text-center" spacing={{ base: '4', md: '5' }}>
                    <Text fontSize="sm" color="fg.subtle">
                        Created by Seba Terrazas
                    </Text>
                    <ButtonGroup variant="tertiary" className="w-full flex flex-row items-center justify-around">
                        <IconButton as="a" href="https://www.linkedin.com/in/seba-terrazas/" aria-label="LinkedIn" icon={<FaLinkedin className="text-3xl transition-transform focus:scale-125 hover:scale-125"/>} />
                        <IconButton as="a" href="https://www.github.com/sebaterrazas" aria-label="GitHub" icon={<FaGithub className="text-3xl transition-transform focus:scale-125 hover:scale-125"/>} />
                        <IconButton as="a" href="https://sebaterrazas.github.io/" aria-label="Personal Website" icon={<TbWorld className="text-3xl transition-transform focus:scale-125 hover:scale-125"/>} />
                    </ButtonGroup>
                </Stack>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }