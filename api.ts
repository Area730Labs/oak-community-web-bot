import { PublicKey } from "@solana/web3.js";
import axios from "axios";
import Config from "./config";

export type Method = "post" | "get";
export interface SdkItem {

    mint: string
    mint_meta: string

    uid: string
    supply: number
    sold: number
    price: number

    price_mint: string
    created_at: string
    last_sold: string
    inactive: boolean
}

export interface SdkProject {
    authority: string,
    address: string,
}

class Api {

    private host: string = Config.apiBaseUrl;

    constructor() {}

    async get_unclaimed_mints(wallet:PublicKey, mints : string[]): Promise<any> {

        try {
            let result = await this.sendRequest("post", `get_unclaimed_oaks`,{
                wallet : wallet.toString(),
                mints : mints,
            });

            return result;
        } catch (e) {
            throw e;
        }
    }

    async get_oak_raid_requests(): Promise<OakRaidRequest[]> {

        try {
            let result = await this.sendRequest("get", `get_oak_raid_requests`);
            return result;
        } catch (e) {
            throw e;
        }
    }

    async claim_oak(form : ClaimOakForm, signature : string): Promise<any> {

        try {
            let result = await this.sendRequest("post", `claim_oak`,{
                data : form,
                signature
            });

            return result;
        } catch (e) {
            throw e;
        }
    }

    private async sendRequest(rm: Method, method: string, args?: any): Promise<any> {

        const url = this.host + method

        try {
            let response_result = await axios.request({
                method: rm,
                url: url,
                data: args,
            })

            if (response_result.data != null) {
                return response_result.data;
            } else {
                throw new Error("no response data were found");
            }
        } catch (e) {
            throw e;
        }
    }


}

export interface ClaimOakForm {
        wallet : string
        mint: string,
        tweet_url: string
}

export interface OakRaidRequest {
    tweet_url: string,
    price: number,
    nft_name : string,
    image_url: string,
    tx_sig: string,
    claim_time: number, 
    is_over: boolean
}

export default Api;
