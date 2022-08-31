import { Box, Container, Img, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import Config from "../config";
import titleTextImage from '../images/welcome_to_paradise.png';
import bottomRightImg from '../images/bottom_right.png';
import bottomRightSkullImg from '../images/bottom_right_skull.png';
import bottomLefttImg from '../images/bottom_left_tree.png';
import bottomLeftBranchImg from '../images/bottom_left_branch.png';
import topLeftImg from '../images/top_left.png';
import topRightImg from '../images/top_right.png';

import arrowLeft from '../images/arrow_left.png';
import arrowRight from '../images/arrow_right.png';
import socialButtonTopOffset from '../images/how_it_works.png';

export function HowItWorksButton() {
    return <Box
        zIndex="1000"
        position="fixed"
        right="0px"
        top="200px"
        textAlign="center"
        className="main-overlay-c"
        height="200px"
    >
        <Img height="100%" src={socialButtonTopOffset.src} />
    </Box>
}

export default function HowItWorks() {
    return <>
        <Box width="850px" textAlign="center" margin="0 auto" className="main-overlay-c">
            <Img src={titleTextImage.src} />

            <Text fontFamily={Config.fontA} fontSize="48px" marginTop="30px" color="black">
                How it works!?
            </Text>

            <Box textAlign="center">
                <Img src={arrowLeft.src} display="inline-block" marginRight="222px" />
                <Img src={arrowRight.src} display="inline-block" />
            </Box>

            <Box textAlign="center" display="flex">
                <Box textAlign="center" width="404px" height="380px" className="box-with-scroll scrol-l">
                    <Text fontFamily={Config.fontA} fontSize="51px" marginTop="30px" color="#344832">
                        New Oaks Holders
                    </Text>

                    <Box display="inline-block" width="280px" margin="auto" marginTop="-18px">
                        <Text fontFamily={Config.fontB} fontSize="12px" marginTop="10px" color="#3C4A3E">
                            Сlaim your purchase, post a tweet, and get blasted with follows, likes, retweets on becoming a holder
                        </Text>
                    </Box>

                    <Box display="inline-block" width="280px" margin="auto" textAlign="left" marginTop="6px">
                        <Text fontFamily={Config.fontA} fontSize="30px" color="#3C4A3E">
                            Steps:
                        </Text>


                    </Box>

                    <Box display="flex" width="280px" margin="auto" textAlign="left" marginTop="-6px">
                        <Text as="span" fontFamily={Config.fontA} fontSize="30px" color="#3C4A3E">
                            1.
                        </Text>

                        <Text as="span" fontFamily={Config.fontB} fontSize="12px" color="#3C4A3E" marginLeft="6px" marginTop="18px">
                            Connect wallet
                        </Text>
                    </Box>

                    <Box display="flex" width="280px" margin="auto" textAlign="left" marginTop="-12px">
                        <Text as="span" fontFamily={Config.fontA} fontSize="30px" color="#3C4A3E">
                            2.
                        </Text>

                        <Text as="span" fontFamily={Config.fontB} fontSize="12px" color="#3C4A3E" marginLeft="6px" marginTop="18px">
                            Claim your proof of purchase
                        </Text>
                    </Box>

                    <Box display="flex" width="280px" margin="auto" textAlign="left" marginTop="-12px">
                        <Text as="span" fontFamily={Config.fontA} fontSize="30px" color="#3C4A3E">
                            3.
                        </Text>

                        <Text as="span" fontFamily={Config.fontB} fontSize="12px" color="#3C4A3E" marginLeft="6px" marginTop="18px">
                            Link a tweet introducing yourself
                        </Text>
                    </Box>

                    <Box display="flex" width="280px" margin="auto" textAlign="left" marginTop="-12px">
                        <Text as="span" fontFamily={Config.fontA} fontSize="30px" color="#3C4A3E">
                            4.
                        </Text>

                        <Text as="span" fontFamily={Config.fontB} fontSize="12px" color="#3C4A3E" marginLeft="6px" marginTop="18px">
                            Get your notifications absolutely destroyed
                        </Text>
                    </Box>

                </Box>

                <Box textAlign="center" width="404px" height="380px" className="box-with-scroll">
                    <Box textAlign="center" width="404px" height="380px" className="box-with-scroll scrol-l">
                        <Text fontFamily={Config.fontA} fontSize="51px" marginTop="30px" color="#344832">
                            Raid for Sol
                        </Text>

                        <Box display="inline-block" width="280px" margin="auto" marginTop="-18px">
                            <Text fontFamily={Config.fontB} fontSize="12px" marginTop="10px" color="#3C4A3E">
                                Win SOL by showing your love to new Oak holders.
                            </Text>
                        </Box>

                        <Box display="inline-block" width="280px" margin="auto" textAlign="left" marginTop="6px">
                            <Text fontFamily={Config.fontA} fontSize="30px" color="#3C4A3E">
                                Steps:
                            </Text>


                        </Box>

                        <Box display="flex" width="280px" margin="auto" textAlign="left" marginTop="-6px">
                            <Text as="span" fontFamily={Config.fontA} fontSize="30px" color="#3C4A3E">
                                1.
                            </Text>

                            <Text as="span" fontFamily={Config.fontB} fontSize="12px" color="#3C4A3E" marginLeft="6px" marginTop="18px">
                                Like, retweet, reply and follow a new Oak’s twitter post.
                            </Text>
                        </Box>

                        <Box display="flex" width="280px" margin="auto" textAlign="left" marginTop="-3px">
                            <Text as="span" fontFamily={Config.fontA} fontSize="30px" color="#3C4A3E">
                                2.
                            </Text>

                            <Text as="span" fontFamily={Config.fontB} fontSize="12px" color="#3C4A3E" marginLeft="6px" marginTop="18px">
                                We’ll pick the most creative, kind, or funny replies to win 33.3 SOL each.
                            </Text>
                        </Box>

                        <Box display="flex" width="280px" margin="auto" textAlign="left" marginTop="-3px">
                            <Text as="span" fontFamily={Config.fontA} fontSize="30px" color="#3C4A3E">
                                3.
                            </Text>

                            <Text as="span" fontFamily={Config.fontB} fontSize="12px" color="#3C4A3E" marginLeft="6px" marginTop="18px">
                                You will be tagged by @OaksCommunity if you win.
                            </Text>
                        </Box>


                    </Box>
                </Box>



            </Box>
        </Box>


        <Img src={topLeftImg.src} className='top-l-img-bg' />
        <Img src={topRightImg.src} className='top-r-img-bg' />


        <Img src={bottomRightImg.src} className='btm-r-img-bg' />
        <Img src={bottomRightSkullImg.src} className='btm-r-img-bg' />
        <Img src={bottomLefttImg.src} className='btm-l-img-bg' />
        <Img src={bottomLeftBranchImg.src} className='btm-l-img-bg' />
    </>
}
