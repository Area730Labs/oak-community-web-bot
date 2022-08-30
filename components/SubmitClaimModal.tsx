import {
    Modal,
    ModalOverlay,
    ModalContent,
    Button,
    Input,
    Box,
    Text
  } from '@chakra-ui/react'
import Config from "../config";

import React from 'react'
import { useDisclosure } from '@chakra-ui/react'

export default function SubmitClaimModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const submitBtn = () => {
        alert("Submitted");
    };
  
    return (
      <>
        <Button onClick={onOpen}>Open Modal</Button>
        <Button ml={4} ref={finalRef}>
          I'll receive focus on close
        </Button>
  
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          isCentered
        >
          <ModalOverlay />


          <ModalContent backgroundColor="#A4BFA7" maxW="540px" maxH="168px" minH="168px" border="1px" borderColor="#1D1F1D">
            <Text as="div" fontFamily={Config.fontA} fontSize="51px"color="#1D1F1D" marginTop="10px" marginLeft="20px">
                Send a link to your Tweet
            </Text>


            <Box className='close-btn' width="32px" height="32px" margin="10px" onClick={onClose} />

            <Box  display="flex" width="500px" margin="auto" textAlign="left" >
                <Input ref={initialRef}  backgroundColor="#829A85" borderColor="#1D1F1D" color="#1D1F1D" height="45px" maxW="400px"
                _hover={{
                    backgroundColor: "#829A85",
                    borderColor: "#1D1F1D",
                    color: "#1D1F1D",
                }}

                _placeholder={{
                    color: "black",
                }}
                />

                <Box className='send-btn' width="80px" height="45px" marginLeft="20px" cursor="pointer" onClick={submitBtn} />
            </Box>

          </ModalContent>
        </Modal>
      </>
    )
  }