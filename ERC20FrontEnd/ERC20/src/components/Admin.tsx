import {
  FiCopy,
  FiInfo,
  FiSettings,
} from "react-icons/fi";

import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useERC20,type Mint } from "../hooks/useERC20";
import { formatAddress } from "../util";
//import { useState } from "react";
import { useWriteERC20 } from "../hooks/specific/useWriteERC20";



const Admin = () => {

  const {inputAmount,amount,setInputAmount,error,setError,mintToken,setAmount} = useERC20();

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) =>{
    if(e.key === "Enter") mintToken();
  }

  const {open} = useAppKit();
  const {address} = useAppKitAccount();
  const {isMinting} = useWriteERC20();

  const handleWalletConnect = () =>{
    open();
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-purple-50 px-7 py-6 pb-10">
      <header className="flex items-center justify-between gap-5 pb-5">
        <div>
          <p className="text-2xl font-black text-gray-800 tracking-tight">The RAJ HQ</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button 
            type="button" 
            onClick={handleWalletConnect}
            className="px-5 py-3 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-sm shadow-lg shadow-purple-500/20 hover:shadow-lg hover:scale-105 transition-all"
          >
            {address ? formatAddress(address) : "Connect Wallet"}
          </button>

          <button
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/75 text-gray-500 shadow-sm shadow-gray-400/20 hover:scale-105 transition-all"
            type="button"
            aria-label="Copy wallet address"
          >
            <FiCopy />
          </button>

          <button 
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/75 text-gray-500 shadow-sm shadow-gray-400/20 hover:scale-105 transition-all"
            type="button" 
            aria-label="Settings"
          >
            <FiSettings />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto mt-7">
        <section className="flex flex-col md:flex-row items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 leading-tight tracking-tight">Admin Dashboard</h1>
            <p className="mt-2.5 text-gray-600 text-sm">
              Manage token minting and contract supply levels.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-br from-green-100 to-cyan-100 text-green-700 text-xs font-bold whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-md shadow-green-500/40" />
            {/* <span>Owner: 0x7fC7...f9a4</span> */}
          </div>
        </section>

        <section className="flex items-center gap-3 px-5 py-4 rounded-full bg-blue-500/10 text-blue-600 shadow-sm shadow-blue-400/25 mb-7">
          <FiInfo className="flex-shrink-0" />
          <span className="text-sm">Only the contract owner can execute admin actions.</span>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.5fr_0.85fr] gap-6 items-start">
          <article className="bg-white/82 rounded-3xl shadow-lg shadow-gray-900/10 bg-clip-padding border border-white/72 backdrop-blur-xl p-8">
            <h2 className="mb-7 text-2xl font-black text-gray-900 tracking-tight">Mint Tokens</h2>

            <div className="mb-4">
              <label htmlFor="mintAmount" className="block mb-2.5 text-gray-600 text-xs font-black uppercase tracking-widest">
                Amount (uint256)
              </label>
              <input
                id="mintAmount"
                type="text"
                placeholder="Enter An Amount"
                value={inputAmount}
                onChange={(e) => setInputAmount(e.target.value)}
                onKeyDown={handleInputKeyDown}
                className="w-full px-4 py-4 border border-gray-200 rounded-2xl bg-gradient-to-b from-blue-50/50 to-gray-100/50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              />
            </div>

            <button
              onClick={mintToken}
              disabled={isMinting}
              className="w-full mt-6 px-5 py-4 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold shadow-lg shadow-purple-500/20 hover:shadow-lg cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              {isMinting ? "Minting..." : "Mint"}
            </button>

            {error && <p className="mt-4 text-red-500 text-sm font-semibold">{error}</p>}
          </article>

          <div className="space-y-4">
            <article className="bg-white/82 rounded-3xl shadow-lg shadow-gray-900/10 bg-clip-padding border border-white/72 backdrop-blur-xl p-6">
              <p className="mb-3 text-gray-600 text-xs font-black uppercase tracking-widest">Supply Stats</p>
              <p className="text-gray-700 text-sm">Total Supply</p>
              <div className="mt-4 flex items-baseline gap-2">
                <strong className="text-3xl text-gray-900">1,240,000</strong>
                <span className="text-gray-600">ETHL</span>
              </div>

              <div className="mt-5 h-2 bg-gray-200 rounded-full overflow-hidden">
                <span className="block h-full w-1/2 bg-gradient-to-r from-blue-500 to-purple-500" />
              </div>

              <div className="mt-3 flex justify-between text-xs text-gray-600">
                <span>Minted (55%)</span>
                <span>Cap (10M)</span>
              </div>
            </article>

            <article className="bg-white/82 rounded-3xl shadow-lg shadow-gray-900/10 bg-clip-padding border border-white/72 backdrop-blur-xl p-6">
              <p className="mb-3 text-gray-600 text-xs font-black uppercase tracking-widest">Supply Stats</p>
              <p className="text-gray-700 text-sm">Max Supply</p>
              <div className="mt-4 flex items-baseline gap-2">
                <strong className="text-3xl text-gray-900">1,240,000</strong>
                <span className="text-gray-600">ETHL</span>
              </div>

              <div className="mt-5 h-2 bg-gray-200 rounded-full overflow-hidden">
                <span className="block h-full w-1/2 bg-gradient-to-r from-blue-500 to-purple-500" />
              </div>

              <div className="mt-3 flex justify-between text-xs text-gray-600">
                <span>Minted (55%)</span>
                <span>Cap (10M)</span>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Admin;
