import { useAppKitAccount } from "@reown/appkit/react";
import { useERC20Contract } from "../useContract";
import { useCallback,useState } from "react";
import {toast} from "react-toastify";
import {ErrorDecoder} from "ethers-decode-error";
import { parseUnits } from "ethers";

const errorDecoder = ErrorDecoder.create();

export const useWriteERC20 = () =>{
    const erc20Contract = useERC20Contract(true);
    const {address} =   useAppKitAccount();
    const  [isMinting, setIsMinting] = useState(false);
    const [isRequestingToken, setIsRequestingToken] = useState(false);
    
    const mintSomeToken = useCallback(async (amount: number) : Promise<boolean> =>{
        if(!address){
            toast.error("Wallet Not Connected");
            return false;
        }
        if(!erc20Contract){
            toast.error("Contract Not Found");
            return false;
        }
        try{
            setIsMinting(true);
            // Convert amount to wei (18 decimals for standard ERC20)
            const amountInWei = parseUnits(amount.toString(), 18);
            const mintTokenTx = await erc20Contract.mint(amountInWei);
            const receipt = await mintTokenTx.wait();
            if(receipt?.status === 1){
                toast.success("Token minted successfully!");
                return true;
            }
            return false;
        }
        catch(error: any){
            console.error("Mint error:", error);
            try {
                const decodeError = await errorDecoder.decode(error);
                toast.error(decodeError.reason || "Transaction failed");
            } catch (decodeErr) {
                toast.error(error?.message || "Failed to mint tokens");
            }
            return false;
        }
        finally {
            setIsMinting(false);
        }
    },[address,erc20Contract]);


    return {isMinting, mintSomeToken}
}