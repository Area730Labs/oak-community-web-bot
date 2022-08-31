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

import React, {useState} from 'react'
import { useDisclosure } from '@chakra-ui/react'

export default function SubmitClaimModal(props) {

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [value, setValue] = useState('')
    const handleChange = (event) => setValue(event.target.value);

    const actionHandler = () => {
      if (!value.startsWith('https://twitter.com/')) {
        return;
      }

      props.onSubmit(value);
      props.onClose();

      setValue('');
    };
  
    return (
      <>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={props.isOpen}
          onClose={props.onClose}
          isCentered
        >
          <ModalOverlay />


          <ModalContent backgroundColor="#A4BFA7" maxW="540px" maxH="168px" minH="168px" border="1px" borderColor="#1D1F1D" boxShadow="-6px 6px 0px 0px #1d1f1d;" borderRadius="10px">
            <Text as="div" fontFamily={Config.fontA} fontSize="51px"color="#1D1F1D" marginTop="10px" marginLeft="20px">
                Send a link to your Tweet
            </Text>


            <Box className='close-btn' width="32px" height="32px" margin="10px" onClick={props.onClose} />

            <Box  display="flex" width="500px" margin="auto" textAlign="left" >
                <Input value={value} pattern='https://.*' type='url' ref={initialRef}  backgroundColor="#829A85" borderColor="#1D1F1D" color="#1D1F1D" height="45px" maxW="400px" borderRadius="10px"
                _hover={{
                    backgroundColor: "#829A85",
                    borderColor: "#1D1F1D",
                    color: "#1D1F1D",
                }}

                _placeholder={{
                    color: "black",
                }}
                />

                <Box className='send-btn' width="80px" height="45px" marginLeft="20px" cursor="pointer" onClick={actionHandler} />
            </Box>

          </ModalContent>
        </Modal>
      </>
    )
  }