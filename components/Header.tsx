import { Box, Img, Text } from "@chakra-ui/react";
import OakButton from "../images/oak_btn_topleft.png";
import ConnectWalletBtnImage from "../images/connect_wallet_btn.svg";
import SocialBtn from "./SocialBtn";
import Config from "../config";
import twitterBtnImage from '../images/tw_button.png';
import discordBtnImage from '../images/discord_button.png';
import { useWallet } from "@solana/wallet-adapter-react";
import { disconnect } from "process";
import { relative } from "path";
import { MultiButton } from "./MultiBtn";

const socialButtonTopOffset = "38px";

export default function Header() {
    
    const { connecting, connect, publicKey, connected, signMessage, disconnect } = useWallet();


    let btnLabel = "CONNECT WALLET";
    if (connecting) {
        btnLabel = "CONNECTING";
    }

    if (connected && publicKey) {
        btnLabel = "DISCONNECT WALLET";
    }

    const btnAction = () => {
        if (!connected) {
            connect();
        }

        if (connected) {
            disconnect();
        }
    };

    return <Box
        height="120px"
        display="flex"
        marginX="20px"
        position="relative"
    >
        <Box zIndex={150} height="120px">
            <Img src={OakButton.src} height="100%"  />
        </Box>

        <SocialBtn image={twitterBtnImage.src} position="absolute" right="240px" top={socialButtonTopOffset} url='https://twitter.com/OakParadiseNFT' />
        <SocialBtn image={discordBtnImage.src} position="absolute" right="300px" top={socialButtonTopOffset} url='https://discord.gg/oakdystopia' />

        <MultiButton/>

        
    </Box>
}
