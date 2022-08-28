import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {
  resolveToWalletAddress,
  getParsedNftAccountsByOwner,
} from "@nfteyez/sol-rayz";
import { useState, useEffect } from 'react';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

const Home: NextPage = () => {
  // const { connecting, publicKey } = useWallet();
  const [nfts, setNfts] = useState([]);

  const publicAddress = "DYNNwUKPjhnHuFi3y6ERVBvwidiBALZC96A2VnWZrYiD";
  
  // if (publicKey) {
  //   const fetchNfts = async () => {
  //     const nftArray = await getParsedNftAccountsByOwner({
  //       publicAddress,
  //     });

  //     console.log(nftArray);
  //   };

  //   fetchNfts();
  // }

  return (
    <WalletMultiButton />
  )
}

export default Home
