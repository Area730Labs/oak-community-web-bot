import { Box, Container, Img, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletConnectButton } from "@solana/wallet-adapter-react-ui";
import { useState } from "react";
import Config from "../config";
import titleTextImage from '../images/welcome_to_paradise.png';
import Step from "./Step";
import WelcomeOakRow, { WelcomeItem } from "./WelcomeOakRow";
import DefaultNftImage from "../images/nft_image_1.png";
import bottomRightImg from '../images/bottom_right.png';
import bottomRightSkullImg from '../images/bottom_right_skull.png';
import bottomLefttImg from '../images/bottom_left_tree.png';
import bottomLeftBranchImg from '../images/bottom_left_branch.png';
import topLeftImg from '../images/top_left.png';
import topRightImg from '../images/top_right.png';
import Header from "./Header";
import { HowItWorksButton } from "./HowItWorks";


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

    const defaultWelcomeItem: WelcomeItem = {
        ImageSrc: DefaultNftImage.src,
        id: "3237",
        tx: "4dACD5w78vhKznU2iaqneNfEPGxUicCCeBZNbJhe3PBZpk7QyCrUvrVfXwPVumFv7URjjQmNu6mmCKwPm1K8XXQt",
        claimed_at: (new Date().getTime() / 1000) - 83832,
        bought_for: 2.53
    }

    const items: WelcomeItem[] = [
        defaultWelcomeItem,
        defaultWelcomeItem,
        defaultWelcomeItem,
        defaultWelcomeItem,
        defaultWelcomeItem,
        defaultWelcomeItem
    ];

    const tabContent = !connected ?
        <Text color="#1D1F1D" fontFamily={Config.fontB} fontSize={18}>Please connect your wallet</Text> :
        <>
            <Text>Connected</Text>
        </>;

    return <>
        <Header />
        <HowItWorksButton />
        <Box width="760px" textAlign="center" margin="0 auto" className="main-overlay-c">
            <Img src={titleTextImage.src} />
            <Box textAlign="left" fontSize="16px" fontFamily={Config.fontB}>
                <Step idx={1}>
                    Like, retweet, reply and follow a new Oak’s twitter post.
                </Step>
                <Step idx={2}>
                    We’ll pick the most creative, kind, or funny replies to win 33.3 Sol each.
                </Step>
                <Step idx={3}>
                    You will be tagged by <Text
                        as="span"
                        fontFamily={Config.fontA}
                        fontSize="24px"
                        color="black"
                    >
                        @OaksCommunity
                    </Text> if you win.
                </Step>
            </Box>
            <Tabs>
                <TabList fontFamily={Config.fontA} fontWeight="bolder" lineHeight="39.2px">
                    <Tab fontSize="32px">Claim Oak</Tab>
                    <Tab fontSize="32px">Welcome Oak</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        {tabContent}
                    </TabPanel>
                    <TabPanel paddingX={0}>
                        <VStack spacing={4}>
                            {items.map((it, idx) => {
                                return <WelcomeOakRow key={idx} item={it} />
                            })}
                        </VStack>
                    </TabPanel>
                </TabPanels>
            </Tabs>

            <WalletConnectButton />
        </Box>



        <Img src={topLeftImg.src} className='top-l-img-bg' />
        <Img src={topRightImg.src} className='top-r-img-bg' />


        <Img src={bottomRightImg.src} className='btm-r-img-bg' />
        <Img src={bottomRightSkullImg.src} className='btm-r-img-bg' />
        <Img src={bottomLefttImg.src} className='btm-l-img-bg' />
        <Img src={bottomLeftBranchImg.src} className='btm-l-img-bg' />
    </>
}
