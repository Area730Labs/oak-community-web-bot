import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import WelcomeOakImage from "./WelcomeOakImage";

export interface WelcomeItem {
    ImageSrc: string
}

export default function WelcomeOakRow(props: { children?: ReactNode, item: WelcomeItem }) {

    return <Box
        boxSizing="border-box"
        backgroundColor="#A4BFA7"
        border="1px solid #1D1F1D"
        boxShadow="-6px 6px 0px 0px #1D1F1D"
        borderRadius="10px"
        width="100%"
        height="120px"
        position="relative"
    >
        <WelcomeOakImage src={props.item.ImageSrc} />
        {props.children}
    </Box>

}