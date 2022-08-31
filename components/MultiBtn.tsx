import { useWallet } from '@solana/wallet-adapter-react';
import type { FC, ReactNode } from 'react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { WalletIcon, WalletConnectButton, useWalletModal, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { WalletModalButton } from '@solana/wallet-adapter-react-ui';
import { Button, ChakraProps, position } from '@chakra-ui/react';
import { Box, Text, Img } from '@chakra-ui/react';
import ConnectWalletBtnImage from "../images/connect_wallet_btn.svg";
import Config from '../config';
import { toast } from 'react-toastify';

export interface MultiButtonProps extends ChakraProps {
    children: string
}

export interface WalletButtonImageProps extends ChakraProps {
    children: string
    onClick?(e)
}

const WalletButtonImage = (props: WalletButtonImageProps) => {

    let {children, ... rest} = props;

    return <Box
        position="absolute"
        height="95px"
        zIndex={150}
        right="10px"
        top="0px"
        cursor="pointer"
        {...rest}
    >
        <Img src={ConnectWalletBtnImage.src} height="100%" />
        <Text as="span" textAlign="center" fontFamily={Config.fontA} fontSize="30px" color="white" position="absolute" top="36px" width="140px" right="24px">
            {children}
        </Text>
    </Box>
}


export const WalletModalButtonOverride = ({ children = 'Select Wallet', onClick, ...props }) => {
    const { visible, setVisible } = useWalletModal();

    const handleClick = useCallback(
        (event: any) => {
            if (onClick) onClick(event);
            if (!event.defaultPrevented) setVisible(!visible);
        },
        [onClick, setVisible, visible]
    );

    return <WalletButtonImage>{children}</WalletButtonImage>;
};

const WalletConnectButtonOverride = ({ children, onClick, ...props }) => {
    const { wallet, connect, connecting, connected } = useWallet();

    const handleClick: any = useCallback(
        (event) => {
            if (onClick) onClick(event);
            if (!event.defaultPrevented) connect().catch(() => { });
        },
        [onClick, connect]
    );

    const content = useMemo(() => {
        if (children) return children;
        if (connecting) return 'Connecting ...';
        if (connected) return 'Connected';
        if (wallet) return 'Connect';
        return 'Connect Wallet';
    }, [children, connecting, connected, wallet]);

    return (
        <WalletButtonImage
            onClick={handleClick}
            {...props}
        >
            {content}
        </WalletButtonImage>
    );
};


export const MultiButton = (props: MultiButtonProps) => {

    let { children, ...rest } = props;

    // return <Box position="relative">
    //     <WalletMultiButton/>;
    // </Box>

    const { publicKey, wallet, disconnect } = useWallet();
    const { setVisible } = useWalletModal();
    const [copied, setCopied] = useState(false);
    const [active, setActive] = useState(false);
    const ref = useRef<HTMLUListElement>(null);

    const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
    const content = useMemo(() => {
        if (children) return children;
        if (!wallet || !base58) return null;
        return base58.slice(0, 4) + '..' + base58.slice(-4);
    }, [children, wallet, base58]);

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

    if (!wallet) return <WalletModalButtonOverride onClick={null}>{children}</WalletModalButtonOverride>;
    if (!base58) return <WalletConnectButtonOverride onClick={null}>{children}</WalletConnectButtonOverride>;

    let btnLabel = "CONNECT WALLET";

    return <WalletButtonImage>{btnLabel}</WalletButtonImage>

    /* <div className="wallet-adapter-dropdown">
         <Button
             aria-expanded={active}
             className="wallet-adapter-button-trigger"
             style={{ pointerEvents: active ? 'none' : 'auto', ...props.style }}
             onClick={openDropdown}
             startIcon={<WalletIcon wallet={wallet} />}
             {...props}
         >
             {content}
         </Button>
         <ul
             aria-label="dropdown-list"
             className={`wallet-adapter-dropdown-list ${active && 'wallet-adapter-dropdown-list-active'}`}
             ref={ref}
             role="menu"
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
     </div> 
 ); */

};