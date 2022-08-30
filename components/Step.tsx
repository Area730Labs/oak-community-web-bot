import { Box,Text } from "@chakra-ui/react"

export interface StepProps {
    children : React.ReactNode,
    idx : number
}

export default function Step(props : StepProps) {

    return <Box>
        <Text>Step {props.idx}: </Text> 
        <Text>
            {props.children}
        </Text>
    </Box>

}