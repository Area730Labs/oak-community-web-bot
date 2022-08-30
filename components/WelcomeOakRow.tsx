import { Box, Link } from "@chakra-ui/react";
import Moment from 'react-moment';
import { ReactNode } from "react";
import Config from "../config";
import TweetBtn from "./TweetBtn";
import WelcomeOakImage from "./WelcomeOakImage";

export interface WelcomeItem {
    ImageSrc: string
    id: string
    tx: string
    claimed_at: number
    bought_for: number
}

function RowTextColumn(props: any) {

    let { children, ...rest } = props;

    return <Box
        {...rest}
        position={"absolute"}
        top="52px"
        fontSize="14px"
        fontFamily={Config.fontB}
        textAlign="left"
    >
        {props.children}
    </Box>
}

function TxLink(props: {tx: string}) {

    let linkText = props.tx.substring(0,11);

    const linkHref = "https://solscan.io/tx/"+props.tx;

    return <Link href={linkHref}>{linkText}...</Link>
}

export default function WelcomeOakRow(props: { children?: ReactNode, item: WelcomeItem }) {

    return <Box
        boxSizing="border-box"
        backgroundColor="#A4BFA7"
        border="1px solid #1D1F1D"
        boxShadow="-6px 6px 0px 0px #1D1F1D"
        borderRadius="10px"
        width="760px"
        height="120px"
        position="relative"

    >
        <WelcomeOakImage src={props.item.ImageSrc} />
        <RowTextColumn left="135px">#{props.item.id}</RowTextColumn>
        <RowTextColumn left="224px"><TxLink tx={props.item.tx}/></RowTextColumn>
        <RowTextColumn left="350px"><Moment unix fromNow>{props.item.claimed_at}</Moment></RowTextColumn>
        <RowTextColumn left="480px">{props.item.bought_for} SOL</RowTextColumn>

        <TweetBtn position="absolute" left="calc(50% - 182px/2 + 269px)" top="28.33%" fontSize="12px" />
    </Box>

}