import {useWallet} from '@solana/wallet-adapter-react';
import type { FC } from 'react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { WalletIcon, WalletConnectButton, useWalletModal } from '@solana/wallet-adapter-react-ui';
import { WalletModalButton } from '@solana/wallet-adapter-react-ui';
import { Button, position } from '@chakra-ui/react';
import { Box, Text, Img } from '@chakra-ui/react';
import ConnectWalletBtnImage from "../images/connect_wallet_btn.svg";
import Config from '../config';

export const MultiButton = () => {
    const { publicKey, wallet, disconnect } = useWallet();

    const [copied, setCopied] = useState(false);
    const [active, setActive] = useState(false);
    const ref = useRef<HTMLUListElement>(null);
    const { visible, setVisible } = useWalletModal();

    const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
   

    const copyAddress = useCallback(async () => {
        if (base58) {
            await navigator.clipboard.writeText(base58);
            setCopied(true);
            setTimeout(() => setCopied(false), 400);
        }
    }, [base58]);

    const openDropdown = useCallback(() => {
        setActive(true);
    }, []);

    const closeDropdown = useCallback(() => {
        setActive(false);
    }, []);

    const openModal = useCallback(() => {
        setVisible(true);
        closeDropdown();
    }, [setVisible, closeDropdown]);

    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            const node = ref.current;

            // Do nothing if clicking dropdown or its descendants
            if (!node || node.contains(event.target as Node)) return;

            closeDropdown();
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, closeDropdown]);

    // if (!wallet) return <WalletModalButton ></WalletModalButton>;
    // if (!base58) return <WalletConnectButton ></WalletConnectButton>;

    const { connecting, connect, connected, signMessage } = useWallet();


    let btnLabel = "CONNECT WALLET";
    if (connecting) {
        btnLabel = "CONNECTING";
    }

    if (connected && base58) {
        btnLabel = "CHANGE WALLET";
    }

    const btnAction = () => {
        if (!connected) {
            openModal();
        }

        if (connected) {
            openDropdown();
        }
    };



    return (
        <>
            <Box position="absolute" height="95px" zIndex={150} right="10px" top="0px" cursor="pointer" onClick={btnAction}>
                <Img src={ConnectWalletBtnImage.src} height="100%" />
                <Text as="span" textAlign="center" fontFamily={Config.fontA} fontSize="30px" color="white" position="absolute" top="36px" width="140px" right="24px">
                    {btnLabel}
                </Text>
            </Box> 

             <ul
                aria-label="dropdown-list"
                className={`wallet-adapter-dropdown-list ${active && 'wallet-adapter-dropdown-list-active'}`}
                ref={ref}
                role="menu"
                style={{
                    position: 'absolute',
                    top: '88px',
                    right: '22px'
                }}
            >
                <li onClick={copyAddress} className="wallet-adapter-dropdown-list-item" role="menuitem">
                    {copied ? 'Copied' : 'Copy address'}
                </li>
                <li onClick={openModal} className="wallet-adapter-dropdown-list-item" role="menuitem">
                    Change wallet
                </li>
                <li onClick={disconnect} className="wallet-adapter-dropdown-list-item" role="menuitem">
                    Disconnect
                </li>
            </ul>
        </>
        
    );
};