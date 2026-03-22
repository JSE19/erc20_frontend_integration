import { useERC20Contract } from "../useContract";
import { useState, useCallback } from "react";
import {toast} from "react-toastify";

export const useReadErc20 = () =>{
    const erc20Contract = useERC20Contract();
    const [isLoadingTotalSupply, setIsLoadingTotalSupply] = useState(false);
    const [isLoadingMaxSupply, setIsLoadingMaxSupply] = useState(false);
    const [isLoadingReqTok, setIsLoadingReqTok] = useState(false);
    const [isLoadingClaimInterval, setIsLoadingClaimInterval] = useState(false);

    const getTotalSupply = useCallback(async(): Promise<bigint | null> =>{
        
        if(!erc20Contract){
            toast.error("ERC20 Contract Not Found");
            return null;
        }
        try{
            setIsLoadingTotalSupply(true);
            const myTotalSupply:bigint = await erc20Contract.totalSupply();
            return myTotalSupply;
        }catch(error){
            return null;
        }finally{
            setIsLoadingTotalSupply(false);
        }
    },[erc20Contract]);

    const getMaxSupply = useCallback(async(): Promise<bigint | null> =>{
        if(!erc20Contract){
            toast.error("ERC20 Contract Not Found");
            return null;
        }
        try{
            setIsLoadingMaxSupply(true);
            const myMaxSupply = await erc20Contract.MAX_SUPPLY();
            return myMaxSupply;
        }catch(error){
            return null;
        }finally{
            setIsLoadingMaxSupply(false);
        }
    },[erc20Contract]);

    const getTokenPerReq = useCallback(async(): Promise<bigint | null>=>{
        if(!erc20Contract){
            toast.error("ERC20 Contract Not Found");
            return null;

        }
        try{
            setIsLoadingReqTok(true);
            const userTokePerReq = await erc20Contract.FAUCET_AMT();
            return userTokePerReq;
        }
        catch(error){
            return null
        }
        finally{
            setIsLoadingReqTok(false)
        }
    },[erc20Contract])

    const getClaimInterval = useCallback(async(): Promise<bigint | null> =>{
        if(!erc20Contract){
            toast.error("ERC20 Contract Not Found");
            return null;
        }
        try{
            setIsLoadingClaimInterval(true);
            const claimInterval = await erc20Contract.CLAIM_INTERVAL();
            return claimInterval;
        }catch(error){
            return null;
        }finally{
            setIsLoadingClaimInterval(false);
        }
    },[erc20Contract])

    return {isLoadingTotalSupply,isLoadingMaxSupply,getTotalSupply,getMaxSupply,getTokenPerReq,isLoadingReqTok,getClaimInterval,isLoadingClaimInterval};
}
