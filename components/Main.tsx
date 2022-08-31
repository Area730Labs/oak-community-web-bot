import { Box, Container, Img, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletConnectButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useMemo, useState } from "react";
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
import { Connection } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

import Api from "../api";
import NotClaimedItem, { NotClaimedItemInterface } from "./NotClaimedItem";

export interface ApiRespItemCondensed {
    mint: string,
    data: any
}

export default function Main() {

    const { connecting, publicKey, connected, signMessage } = useWallet();
    const [nfts, setNfts] = useState([]);

    const [tokensChanges, setTokenChanges] = useState(0);
    const [walletMints, setWalletMints] = useState<string[]>([]);

    const [notClaimedItems, setNotClaimedItems] = useState<ApiRespItemCondensed[]>([]);
    const [unclaimedChanges, setUnclaimedChanges] = useState(0);

    const [items, setItems] = useState<WelcomeItem[]>([]);

    const publicNode = useMemo(() => {
        return new Connection('https://api.mainnet-beta.solana.com');
    }, [])

    useEffect(() => {
        if (connected && publicNode != null) {

            publicNode.getParsedTokenAccountsByOwner(publicKey, {
                programId: TOKEN_PROGRAM_ID,
            }).then((tokens) => {
                var result = [];

                for (const tokenInfo of tokens.value) {

                    const tokenInfoParsed = tokenInfo.account.data.parsed.info;
                    const tokenAm = tokenInfoParsed.tokenAmount;

                    if (tokenAm.uiAmount == 1 && tokenAm.decimals == 0) {
                        result.push(tokenInfoParsed.mint);
                    }
                }

                setWalletMints(result);
                setTokenChanges(tokensChanges + 1);
            })
        } else {
            setWalletMints([]);
            setTokenChanges(tokensChanges + 1);
        }
    }, [publicNode, connected])

    useEffect(() => {
        if (walletMints.length > 0) {
            const api = new Api();
            api.get_unclaimed_mints(publicKey, walletMints).then((respdata) => {


                let arr: ApiRespItemCondensed[] = [];
                for (var key in respdata) {

                    const item = respdata[key];
                    arr.push({
                        mint: key,
                        data: item.data
                    });
                }

                setNotClaimedItems(arr)
                setUnclaimedChanges(unclaimedChanges + 1);

            }).catch((e) => {
                console.error('unable to get unclaimed mints response : ', e.message)
            })
        }
    }, [tokensChanges]);


    useEffect(() => {
        const api = new Api();
        api.get_oak_raid_requests().then((items) => {

            let itemsArr = [];

            for (const item of items) {

                try {
                    let it: WelcomeItem = {
                        ImageSrc: item.image_url,
                        id: item.nft_name.split("#")[1],
                        tx: item.tx_sig,
                        claimed_at: item.claim_time,
                        bought_for: item.price
                    }

                    itemsArr.push(it);
                } catch (e) {
                    console.log('got an issue with some item',item)
                }
            }

            setItems(itemsArr);
        })
    })
   
    const tabContent = !connected ?
        <Text color="#1D1F1D" fontFamily={Config.fontB} fontSize={18}>Please connect your wallet</Text> :
        <>
            {notClaimedItems.length > 0 ? (notClaimedItems.map((it, key) => {

                const item: NotClaimedItemInterface = {
                    ImageSrc: it.data.image,
                    id: it.data.name.split("#")[1],
                    mint: it.mint
                };

                return <NotClaimedItem key={key} item={item} />
            })) : <Text>No items to claim</Text>}
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

        </Box>



        <Img src={topLeftImg.src} className='top-l-img-bg' />
        <Img src={topRightImg.src} className='top-r-img-bg' />


        <Img src={bottomRightImg.src} className='btm-r-img-bg' />
        <Img src={bottomRightSkullImg.src} className='btm-r-img-bg' />
        <Img src={bottomLefttImg.src} className='btm-l-img-bg' />
        <Img src={bottomLeftBranchImg.src} className='btm-l-img-bg' />
    </>
}
