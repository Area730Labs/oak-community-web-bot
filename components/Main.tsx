import { Box, Img, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useMemo, useState } from "react";
import Config from "../config";
import titleTextImage from '../images/welcome_to_paradise.png';
import Step from "./Step";
import WelcomeOakRow from "./WelcomeOakRow";
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
import HowItWorks from "./HowItWorks";
import Api, { OakRaidRequest, ClaimOakForm } from "../api";
import NotClaimedItem, { NotClaimedItemInterface } from "./NotClaimedItem";
import { toast } from "react-toastify";
import { useDisclosure } from '@chakra-ui/react'
import SubmitClaimModal from "./SubmitClaimModal";

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

    const [items, setItems] = useState<OakRaidRequest[]>([]);

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

    const [curMint, setCurMint] = useState('');

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
            setItems(items);
        }).catch((e) => {
            toast.error('Unable to load welome oaks')
        }) 
    }, [])

    const [isHowItworks, setIsHowItWorks ] = useState(true);

    const { isOpen, onOpen, onClose } = useDisclosure();
   
    const tabContent = !connected ?
        <Text color="#1D1F1D" fontFamily={Config.fontB} fontSize={18}>Please connect your wallet</Text> :
        <>
            {notClaimedItems.length > 0 ? (notClaimedItems.map((it, key) => {

                const item: NotClaimedItemInterface = {
                    ImageSrc: it.data.image,
                    id: it.data.name.split("#")[1],
                    mint: it.mint,
                    onClick: () => {
                        setCurMint(it.mint);
                        onOpen();
                    }
                };

                return <NotClaimedItem key={key} item={item} />
            })) : <Text>No items to claim</Text>}
        </>;

        const [tabIndex, setTabIndex] = useState(0);

    if (isHowItworks) {
        return (
            <>
                <Header />
                <HowItWorks onLeftClick={() => {setTabIndex(0);setIsHowItWorks(false);}} onRightClick={() => {setTabIndex(1);setIsHowItWorks(false);}} />
            </>
        );
    }

    const claimHandler = (tweet_url) => {
        const form: ClaimOakForm = {
            wallet: publicKey.toString(),
            mint: curMint,
            tweet_url
        };

        (async () => {

            try {
                const message = new TextEncoder().encode(JSON.stringify(form));
                const signature = await signMessage(message);
                const sigb64 = Buffer.from(signature).toString('base64');

                const api = new Api();
                api.claim_oak(form, sigb64).then((resp) => {
                    toast.info('sent claim request');
                }).catch(e => {
                    toast.error('error: ' + e.message);
                })
            } catch (e) {
                toast.warn("Sign request rejected")
            }

        })()
    };


    return <>
        <Header />
        <SubmitClaimModal isOpen={isOpen} onClose={onClose} onSubmit={claimHandler}/>
        <HowItWorksButton onClick={setIsHowItWorks} />
        <Box width="760px" textAlign="center" margin="0 auto" className="main-overlay-c">
            <Img src={titleTextImage.src} />
            <Box textAlign="left" fontSize="16px" fontFamily={Config.fontB}>
               {tabIndex == 1 && (
                 <>
                    <Step idx={1}>
                        Welcome a new Oak Paradise community member by liking, retweeting and replying to their post.
                    </Step>
                    <Step idx={2}>
                        Our team is going to pick the most creative, unique and funny coments to win 3 sol per day.
                    </Step>
                    <Step idx={3}>
                        You will be tagged by <Text
                            as="span"
                            fontFamily={Config.fontA}
                            fontSize="24px"
                            color="black"
                        >
                            @oakcommunities
                        </Text> if you win.
                    </Step>
                 </>
               )}

                {tabIndex == 0 && (
                 <>
                    <Step idx={1}>
                        Connect your Solana wallet
                    </Step>
                    <Step idx={2}>
                        Claim your proof of purchase
                    </Step>
                    <Step idx={3}>
                        Link a tweet
                    </Step>
                    <Step idx={4}>
                        Enjoy your twitter fame
                    </Step>
                 </>
               )}
            </Box>
            <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)} marginTop="30px">
                <TabList fontFamily={Config.fontA} fontWeight="bolder" lineHeight="39.2px" borderColor='#75615A'>
                    <Tab fontSize="32px" _active={{backgroundColor: 'none'}} _selected={{color: "#1D1F1D", borderColor: '#372C29'}} color="#3C4A3E">Claim Oak</Tab>
                    <Tab fontSize="32px"  _active={{backgroundColor: 'none'}} _selected={{color: "#1D1F1D", borderColor: '#372C29'}} color="#3C4A3E">Welcome Oak</Tab>
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
