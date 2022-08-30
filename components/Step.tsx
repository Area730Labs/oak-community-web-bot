import { Box,Text } from "@chakra-ui/react"

export interface StepProps {
    children : React.ReactNode,
    idx : number
}

export default function Step(props : StepProps) {

    return <Box marginTop="20px">
        <Text color="#1D1F1D" display="inline">Step {props.idx}: </Text> 
        <Text color="#3C4A3E" display="inline">
            {props.children}
        </Text>
    </Box>

}