import { useState, useCallback } from "react";

import { useWriteERC20 } from "./specific/useWriteERC20";
import {useReadERC20} from "./specific/useReadERC20"

import {toast} from "react-toastify";


export interface Mint{
    mintAmount: number
}

export const useERC20 = () =>{
    const [amount, setAmount] = useState<Mint>();
    const [inputAmount, setInputAmount] = useState("");
    const [error, setError] = useState("");
    const {mintSomeToken} = useWriteERC20();


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

    const requestToken = useCallback(async()=>{},[])

    return {inputAmount,amount,setInputAmount,error,setError,mintToken,setAmount}
}

// export interface ReqTok{

// }