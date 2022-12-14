import { Box, GridItem, Text } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { ReactNode } from "react";
import Api, { ClaimOakForm } from "../api";
import Config from "../config";
import WelcomeOakImage from "./WelcomeOakImage";
import { RowTextColumn } from "./WelcomeOakRow";
import { toast } from 'react-toastify';

export interface NotClaimedItemInterface {
    ImageSrc: string
    id: string
    mint: string
    onClick: any
}

export default function NotClaimedItem(props: { children?: ReactNode, item: NotClaimedItemInterface }) {

    const { publicKey, signMessage } = useWallet();

    


    return <Box
        boxSizing="border-box"
        backgroundColor="#A4BFA7"
        border="1px solid #1D1F1D"
        boxShadow="-6px 6px 0px 0px rgba(29, 31, 29, 1)"
        borderRadius="10px"
        width="370px"
        _even={{ backgroundColor: "#9CB795" }}
        height="120px"
        position="relative"

    >
        <WelcomeOakImage src={props.item.ImageSrc} />
        <RowTextColumn left="135px">#{props.item.id}</RowTextColumn>
        <ClaimBtn position="absolute" left="250px" top="28.33%" fontSize="12px" onClick={() => props.item.onClick(props.item.mint)} />
    </Box>

}

export function ClaimBtn(props: any) {
    return <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems={"center"}
        paddingY="16px"
        paddingX="24px"
        backgroundColor={"#E9DECA"}
        borderRadius="10px"
        border="1px solid #1D1F1D"
        cursor="pointer"
        {...props}
    >
        <Text marginLeft="5px" fontFamily={Config.fontB} flex="none" order="1" flexGrow="0">Claim</Text>
    </Box>
} 