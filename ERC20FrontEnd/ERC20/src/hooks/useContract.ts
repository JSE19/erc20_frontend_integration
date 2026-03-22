import {useMemo} from "react";
import { Contract } from "ethers";
import { getAddress } from "ethers";
import useRunners from "./useRunner";
import {TOKEN_FAUCET_ABI} from "../ABI/erc20";

export const useERC20Contract = (withSigner = false) => {
  const { readOnlyProvider, signer } = useRunners();

  return useMemo(() => {
    if (withSigner) {
      if (!signer) return null;
      return new Contract(
        getAddress(import.meta.env.VITE_ERC20_CONTRACT_ADDRESS),
        TOKEN_FAUCET_ABI,
        signer
      );
    }
    return new Contract(
      getAddress(import.meta.env.VITE_ERC20_CONTRACT_ADDRESS),
      TOKEN_FAUCET_ABI,
      readOnlyProvider
    );
  }, [readOnlyProvider, signer, withSigner]);
};
