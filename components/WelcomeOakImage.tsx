import { Box, Img } from "@chakra-ui/react";

const boxSize = 90;
const boxSizePx = boxSize + "px";

export default function WelcomeOakImage(props : {src: string}) {
    return <Box
        width={boxSizePx}
        height={boxSizePx}
    >
        <Img src={props.src}/>
    </Box>
}