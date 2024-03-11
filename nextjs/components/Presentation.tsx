import { 
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from "@chakra-ui/react"

import { BiSolidSlideshow } from "react-icons/bi"

import { EmblaOptionsType } from 'embla-carousel'
import EmblaCarousel from "./carousel/EmblaCarousel"
import { useContext } from "react"

import { MainContext } from './MainView';


export default function Presentation({ location }: {location: string | undefined}) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const title = location ? `Gallery from ${location}` : "Gallery"

    const OPTIONS: EmblaOptionsType = {}
    const mainContext = useContext(MainContext);

    const gallery = mainContext.gallery;
    return (
      <>
        <BiSolidSlideshow
            onClick={onOpen}
            className="absolute top-5 right-12 w-5 h-5 text-gray-600 transition-transform focus:scale-125 hover:scale-125 cursor-pointer"
        />
  
        <Modal onClose={onClose} isOpen={isOpen} size='xl' scrollBehavior={'inside'}>
          <ModalOverlay />
          <ModalContent className='h-full'>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody className="h-full">
              <EmblaCarousel slides={gallery} options={OPTIONS} />
            </ModalBody>
            {/* <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter> */}
          </ModalContent>
        </Modal>
      </>
    )
  }