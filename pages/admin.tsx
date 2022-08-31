import type { NextPage } from 'next'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Container,
    Button,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Spinner,
    Img,
    Text
  } from '@chakra-ui/react'

import { useState, useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import bottomRightImg from '../images/bottom_right.png';
import bottomRightSkullImg from '../images/bottom_right_skull.png';
import bottomLefttImg from '../images/bottom_left_tree.png';
import bottomLeftBranchImg from '../images/bottom_left_branch.png';
import topLeftImg from '../images/top_left.png';
import topRightImg from '../images/top_right.png';



const Admin: NextPage = () => {
    const [items, setItems] = useState([]);
    const {signMessage, publicKey} = useWallet();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const getData = async() => {
        let data = await (await fetch('https://api.soltracker.io/get_oak_raid_requests')).json();
        console.log(data);

        setItems(data);
    };


    useEffect(() => {
        if (!items) {
            return;
        }

        getData();
    }, []);

    const selectWinnerAction = async (row_id) => {
        onOpen();

      
        try {    
            const data = {
                'wallet': publicKey.toString(),
                'row_id': row_id
            };

            const message = new TextEncoder().encode(JSON.stringify(data));
            const signature = await signMessage(message);
            const base64str = Buffer.from(signature).toString('base64');

            const payload = {
                'data': data,
                'signature': base64str
            };

            const winnerRes = (await fetch('https://api.soltracker.io/select_oak_winner', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })).json();

            if (Object.hasOwn(winnerRes, 'error')) {
                alert('Error');
            } else {
                await getData();
            }
        } catch (error) {
            alert('Operation failed');
        } finally {
            onClose();
        }
    };

    const norifyWinner = async (row_id) => {
        onOpen();

        const data = {
                'wallet': publicKey.toString(),
                'row_id': row_id
        };
        
        try {      
            const message = new TextEncoder().encode(JSON.stringify(data));
            const signature = await signMessage(message);
            const base64str = Buffer.from(signature).toString('base64');

            const payload = {
                'data': data,
                'signature': base64str
            };

            const winnerRes = (await fetch('https://api.soltracker.io/notify_oak_winner', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })).json();

            if (Object.hasOwn(winnerRes, 'error')) {
                alert('Error');
            } else {
                await getData();
                alert('Winner was notified in twitter. Raid closed');
            }
        } catch (error) {
            alert('Operation failed');
        } finally {
            onClose();
        }
    };

    if (!publicKey) {
        return (
            <>
             <Container maxW="400px" marginTop="200px" backgroundColor="white" borderRadius="10px" paddingTop="25px" minH="100px" textAlign="center" display="flex">
                <Text fontSize="30px" marginRight="50px" marginLeft="40px">Log in:</Text>
                <WalletMultiButton style={{margin: 'auto'}}/>
             </Container>
            </>
        );
    }

    return (
        <>
        <Modal onClose={null} isOpen={isOpen} isCentered size='xs'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign="center">Working...</ModalHeader>

                <ModalBody textAlign="center">
                    <Spinner />
                </ModalBody>
            </ModalContent>
        </Modal>

        <Container maxW="1000px" marginTop="40px" backgroundColor="white" borderRadius="10px" paddingTop="25px" position="relative" zIndex="3">
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Current raids</TableCaption>
                    <Thead> 
                    <Tr>
                        <Th>Status</Th>
                        <Th>NFT Name</Th>
                        <Th>Tweet Url</Th>
                        <Th>Winner</Th>
                        <Th isNumeric>Pick winner</Th>
                        <Th isNumeric>Notify</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {items.map((elem, i) => {return (
                            <Tr key={elem['id']}>
                            <Td>
                                <Box backgroundColor={elem['is_over'] ? "grey" : "green"} width="10px" height="10px" borderRadius="5px"/>
                            </Td>
                            <Td>{elem['nft_name']}</Td>
                            <Td><a href={elem['tweet_url']} target="_blank" rel="noreferrer">{elem['tweet_url'].replace('https://', '').substring(0, 20) + '...'}</a></Td>
                            <Td>
                                {elem['winner'] && (
                                    <a href={"https://twitter.com/" + elem['winner']} target="_blank"  rel="noreferrer">@{elem['winner']}</a>
                                )}
                                {!elem['winner'] && (
                                    "-"
                                )}
                            </Td>
                            <Td isNumeric> 
                                {!elem['is_over'] && (
                                    <Button colorScheme='teal' size='sm' onClick={() => {selectWinnerAction(elem['id'])}}>
                                        Pick winner
                                    </Button>
                                )}

                                {elem['is_over'] && ("-")}
                            </Td>
                            <Td isNumeric> 
                                {!elem['is_over'] && (
                                    <Button colorScheme='teal' size='sm' onClick={() => norifyWinner(elem['id'])}>
                                        Notify
                                    </Button>
                                )}

                                {elem['is_over'] && ("-")}
                            </Td>
                        </Tr>)
                        })}
                   
                
                    </Tbody>
                    
                </Table>
                </TableContainer>
        </Container>


        <Img src={topLeftImg.src} className='top-l-img-bg' />
        <Img src={topRightImg.src} className='top-r-img-bg' />


        <Img src={bottomRightImg.src} className='btm-r-img-bg' />
        <Img src={bottomRightSkullImg.src} className='btm-r-img-bg' />
        <Img src={bottomLefttImg.src} className='btm-l-img-bg' />
        <Img src={bottomLeftBranchImg.src} className='btm-l-img-bg' />
        
        </>
    )
}

export default Admin
