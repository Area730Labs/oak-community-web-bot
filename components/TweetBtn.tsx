import { Box, Img, Text } from "@chakra-ui/react";
import Config from "../config";
import twitterImgBtn from '../images/tw_logo_btn.png';

export default function TweetBtn(props: any) {
    return <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems={"center"}
        paddingY="16px"
        paddingX="24px"
        width="182px"
        backgroundColor={"#E9DECA"}
        borderRadius="10px"
        border="1px solid #1D1F1D"
        cursor="pointer"
        onClick={() => {
            window.open(props.link,"_blank")
        }}
        {...props}
    >
        <Box width="25px" height="20px" flex="none" order="0" flexGrow="0">
            <Img src={twitterImgBtn.src} />
        </Box>
        <Text marginLeft="5px" fontFamily={Config.fontB} flex="none" order="1" flexGrow="0">Welcome new Oak</Text>
    </Box>
} 