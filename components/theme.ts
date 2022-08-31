import { extendTheme } from '@chakra-ui/react'


const theme = extendTheme({
    styles: {
        global: (props) => ({
            body: {
                bg: (props) => "#7C9B80"
            },
            colors: {
                borderColor : "#75615A"
            }
        })
    },
})

export default theme;