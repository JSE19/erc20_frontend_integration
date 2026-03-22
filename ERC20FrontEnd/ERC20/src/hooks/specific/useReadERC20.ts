import { useAppKitAccount } from "@reown/appkit/react";
import { useERC20Contract } from "../useContract";
import { useState, useCallback } from "react";
import {toast} from "react-toastify";
// import { Mint } from "../useERC20";
// import type { Numeric } from "ethers";

export const useReadErc20 = () =>{
    const erc20Contract = useERC20Contract();
    //const {address} = useAppKitAccount();
    const [isLoadingTotalSupply, setIsLoadingTotalSupply] = useState(false);
    const [isLoadingMaxSupply, setIsLoadingMaxSupply] = useState(false);

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
            return;
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

    return {isLoadingTotalSupply,isLoadingMaxSupply,getTotalSupply,getMaxSupply};
}