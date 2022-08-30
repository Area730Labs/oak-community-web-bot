import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { SolflareWalletAdapter, PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react'
import { Box, ChakraProvider, Img } from '@chakra-ui/react'
require('@solana/wallet-adapter-react-ui/styles.css');

import topleftimage from '../images/top_left.png'
import bottomLeft from '../images/bottom_left_tree.png'
import bottomRight from '../images/bottom_right.png'
import topRight from '../images/top_right.png'



function MyApp({ Component, pageProps }: AppProps) {
    const network = WalletAdapterNetwork.Mainnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new SolflareWalletAdapter(),
            new PhantomWalletAdapter()
        ],
        []
    );

    return (
        <>
            {/* <Box position='absolute' top={0} left={0}>
                <Img src={topleftimage.src}  />
            </Box>
            <Img src={bottomLeft.src} position='absolute' bottom={0} left={0} />
            <Img src={bottomRight.src} position='absolute' bottom={0} right={0} />
            <Img src={topRight.src} position='absolute' top={0} right={0} /> */}
            <ChakraProvider>
                <ConnectionProvider endpoint={endpoint}>
                    <WalletProvider wallets={wallets} >
                        <WalletModalProvider>
                            <Component {...pageProps} />
                        </WalletModalProvider>
                    </WalletProvider>
                </ConnectionProvider>
            </ChakraProvider>
        </>
    )
}

export default MyApp
