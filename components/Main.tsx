import { Box, Container, Img, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletConnectButton } from "@solana/wallet-adapter-react-ui";
import { useState } from "react";
import Config from "../config";
import titleTextImage from '../images/welcome_to_paradise.png';
import Step from "./Step";

export default function Main() {

    const { connecting, publicKey, connected, signMessage } = useWallet();
    const [nfts, setNfts] = useState([]);

    if (connected && signMessage != null) {

        const obj = {
            "wallet": publicKey?.toBase58(),
            "row_id": 7
        };

        const message = new TextEncoder().encode(JSON.stringify(obj));

        (async function () {
            try {
                const signature = await signMessage(message);
                const base64str = Buffer.from(signature).toString('base64');
                console.log(base64str)
            } catch (e) {
                console.warn(`unable to sign a message : ${e.message}`)
            }
        })()
    }
    // if (publicKey) {
    //   const fetchNfts = async () => {
    //     const nftArray = await getParsedNftAccountsByOwner({
    //       publicAddress,
    //     });

    //     console.log(nftArray);
    //   };

    //   fetchNfts();
    // }

    return <>
        <Container maxW='2xl' backgroundColor={Config.globalBgColor}>
            <Img src={titleTextImage.src} />
            <Step idx={1}>
                Like, retweet, reply and follow a new Oak’s twitter post.
            </Step>
            <Step idx={2}>
                We’ll pick the most creative, kind, or funny replies to win 33.3 Sol each.
            </Step>
            <Step idx={3}>
                You will be tagged by <Box
                    display="inline"
                    fontWeight="bold"
                    fontFamily={Config.fontA}
                >
                    @OaksCommunity
                </Box>
            </Step>

            <Tabs>
                <TabList fontFamily={Config.fontA}>
                    <Tab>Claim Oak</Tab>
                    <Tab>Welcome Oak</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <p>one!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>three!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>

            <WalletConnectButton />
        </Container>
    </>
}
