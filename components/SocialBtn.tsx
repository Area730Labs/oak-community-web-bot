import { Box, Img, Text } from "@chakra-ui/react";

export interface SocialBtnProps {
    image: string
}

const BtnSize = 44;
const BtnSizePx = BtnSize+"px";

export default function SocialBtn(props: SocialBtnProps) {

    return <Box
        zIndex={100}
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems={"center"}
        width={BtnSizePx}
        height={BtnSizePx}
        backgroundColor={"#E9DECA"}
        borderRadius="10px" 
        border="1px solid #1D1F1D"
        boxShadow=" -3px 3px 0px #1D1F1D"
        cursor="pointer"
        {...props}
    >
        <Box width="25px" height="20px" flex="none" order="0" flexGrow="0">
            <Img src={props.image} />
        </Box>
    </Box>
} 