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
import theme from '../components/theme'

function MyApp({ Component, pageProps }: AppProps) {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new SolflareWalletAdapter(),
            new PhantomWalletAdapter(),
        ],
        []
    );

    return (
        <>
            <ChakraProvider theme={theme}>
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
