import { Box, Img } from "@chakra-ui/react";

const boxSize = 90;
const boxSizePx = boxSize + "px";

export default function WelcomeOakImage(props: { src: string }) {
    return <Box
        width={boxSizePx}
        height={boxSizePx}
        position="absolute"
        left="1.97%"
        top="12.5%"
        bottom="12.5%"
        borderRadius="6px"
        overflow="hidden"
        
    >
        <Img src={props.src} />
    </Box>
}