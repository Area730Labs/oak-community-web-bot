import { Box, Img, Skeleton } from "@chakra-ui/react";
import { useState } from "react";


const boxSize = 90;
const boxSizePx = boxSize + "px";

export default function WelcomeOakImage(props: { src: string }) {
    const [loaded, setLoaded] = useState(false);

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
        {!loaded && (
            <Skeleton height='90px'></Skeleton>
        )}
        <Box display={loaded ? 'block': 'none'}>
            <Img src={props.src} onLoad={() => setLoaded(true)}/>
        </Box>

        
    </Box>
}