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
import { Box } from '@chakra-ui/react';
import Main from '../components/Main';
import { HowItWorksButton } from '../components/HowItWorks';

const Home: NextPage = () => {

  return (
      <Main />
  )
}

export default Home
