import { Box, Img } from "@chakra-ui/react";
import OakButton from "../images/oak_btn_topleft.png";
import ConnectWalletBtnImage from "../images/connect_wallet.png";
import SocialBtn from "./SocialBtn";

import twitterBtnImage from '../images/tw_button.png';
import discordBtnImage from '../images/discord_button.png';

const socialButtonTopOffset = "38px";

export default function Header() {
    return <Box
        height="120px"
        display="flex"
        marginX="20px"
        position="relative"
    >
        <Box zIndex={150} height="120px">
            <Img src={OakButton.src} height="100%" />
        </Box>

        <SocialBtn image={twitterBtnImage.src} position="absolute" right="240px" top={socialButtonTopOffset} />
        <SocialBtn image={discordBtnImage.src} position="absolute" right="300px" top={socialButtonTopOffset} />

        <Box position="absolute" height="95px" zIndex={150} right="10px" top="0px">
            <Img src={ConnectWalletBtnImage.src} height="100%" />
        </Box>
    </Box>
}