"use client";

import Image from 'next/image';
import { useState } from 'react';

import { 
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Text,
  Stack,
} from "@chakra-ui/react"

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'

import { FaLocationDot, FaCalendar } from "react-icons/fa6";
import { HiInformationCircle } from "react-icons/hi";

import classes from "./Map.module.css";

import placeholder from '@/public/polaroid_placeholder.png'

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const MapPhoto = ({ media, zoom, rotation }: { media: any, zoom: number, rotation: number }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <div onClick={onOpen}>
        <Polaroid 
          media={media} 
          zoom={zoom}
          rotation={rotation}
        />
      </div>

      <Modal onClose={onClose} isOpen={isOpen} isCentered size='full'>
        {/* <ModalOverlay /> */}
        <ModalContent className='h-full'>
          <ModalBody className='h-full flex justify-center'>
            <img
              alt={media.location || "location"}
              style={{ objectFit: "contain"}}
              src={media.publicUrl || "https://bit.ly/placeholder-img"}
              className={
                'group-hover:opacity-75 duration-700 ease-in-out grayscale-0 blur-0 scale-100'
              }
            />
          </ModalBody>
          {/* <ModalFooter  className='h-1/6'>
            {media.location} | {media.datetime}
          </ModalFooter> */}
          <Information media={media}/>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
  )
}

const Polaroid = ({ media, zoom, rotation }: { media: any, zoom: number, rotation: number }) => {
  const [isLoading, setLoading] = useState(true);

  return (
  <a href="#" className={classes.photoContainer} style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 0.3s ease-in-out' }}>
      <div className="bg-gray-200 overflow-hidden" style={{ marginTop: `${zoom}px`, marginLeft: `${zoom}px`, marginRight: `${zoom}px`, width: `${10 * zoom}px`, height: `${10 * zoom}px`, position: "relative" }}>
        {isLoading && (
          <Image
            alt={"placeholder"}
            fill
            sizes="(max-width: 220px) 100vw, (max-width: 220px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            src={placeholder}
            className={'group-hover:opacity-75 duration-700 ease-in-out grayscale-0 blur-0 scale-100'}
          />
        )}
        <Image
          alt={media.location || "location"}
          fill
          sizes="(max-width: 220px) 100vw, (max-width: 220px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          src={media.publicUrl || "https://bit.ly/placeholder-img"}
          className={cn(
            'group-hover:opacity-75 duration-700 ease-in-out',
            isLoading
              ? 'grayscale blur-2xl scale-110'
              : 'grayscale-0 blur-0 scale-100'
          )}
          onLoad={() => setLoading(false)}
        />
      </div>
      <h3 className="font-medium text-gray-900 text-white" style={{ fontSize: zoom, lineHeight: 2+0.03*zoom }}> . </h3>
    </a>
  );
}

const Information = ({ media }: { media: any }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <Box className="absolute top-1 left-0 w-full">
      {showInfo &&
        <Stack spacing={2} className="absolute top-1 left-16 bg-gradient-to-b from-background pb-28 pt-4 flex justify-center items-center text-start" >
          <Box className='flex flex-row w-full gap-2'>
            <FaLocationDot/> <Text fontSize='sm' noOfLines={1} className='w-4/5'>{media.location}</Text>
          </Box>
          <Box className='flex flex-row w-full gap-2'>
            <FaCalendar /> <Text fontSize='sm' noOfLines={1} className='w-4/5'>{media.datetime}</Text>
          </Box>
        </Stack>
      }
      <Button onClick={() => setShowInfo(!showInfo)} variant='tertiary'>
        <HiInformationCircle className="text-2xl text-text bg-background"/>
      </Button>
    </Box>
  )
}