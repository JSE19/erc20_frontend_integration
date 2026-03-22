import { useState, useCallback, useEffect } from "react";

import { useWriteERC20 } from "./specific/useWriteERC20";
import {useReadErc20} from "./specific/useReadERC20"


export interface Mint{
    mintAmount: number
}

export const useERC20 = () =>{
    const [amount, setAmount] = useState<Mint>();
    const [inputAmount, setInputAmount] = useState("");
    const [error, setError] = useState("");
    const {mintSomeToken} = useWriteERC20();
    const {requestToken} =useWriteERC20();
    const [totalSup, setTotalSup] = useState<bigint | null>(null);
    const [totalMaxSup, setTotalMaxSup] = useState<bigint | null>(null);
    const [tokPerReq,setTokenPerReq] = useState<bigint | null>(null);
    const [claimInterval, setClaimInterval] = useState<bigint | null>(null);
    const {getMaxSupply, getTotalSupply, getTokenPerReq, getClaimInterval} = useReadErc20();


    useEffect(()=>{
        const getAll = async()=>{
            const [totSupply, totMaxSupply, userTok, interval] = await Promise.all([
                getTotalSupply(),
                getMaxSupply(),
                getTokenPerReq(),
                getClaimInterval(),
            ]);
            setTotalSup(totSupply);
            setTotalMaxSup(totMaxSupply);
            setTokenPerReq(userTok);
            setClaimInterval(interval);
        }
        getAll();
    },[getTotalSupply, getMaxSupply,getTokenPerReq,getClaimInterval])


    const mintToken = useCallback(async()=>{
        const amountValue = inputAmount.trim();
        if(!amountValue){
            setError("Amount Can't be Empty");
            return;
        }
        const parsedAmount = Number(amountValue);
        if(Number.isNaN(parsedAmount) || parsedAmount <= 0){
            setError("Enter a valid positive amount");
            return;
        }

        setError("");
        const isMintSuccessful = await mintSomeToken(parsedAmount);
        if(!isMintSuccessful) return;

        setInputAmount("");
    },[inputAmount, mintSomeToken]);

    const reqToken = useCallback(async(): Promise<boolean>=>{
        setError("");
        const isRequestSuccessful= await requestToken();
        if(!isRequestSuccessful) return false;
        return true;
    },[requestToken]);

    return {inputAmount,amount,setInputAmount,error,setError,mintToken,setAmount, totalMaxSup, totalSup,reqToken,tokPerReq,claimInterval}
}

// export interface ReqTok{

// }
