import {
  FiClock,
  FiDroplet,
  FiGlobe,
  FiSettings,
  FiShield,
} from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";

import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useERC20 } from "../hooks/useERC20";
import { formatAddress, formatDuration, formatTokenAmount } from "../util";
import { useWriteERC20 } from "../hooks/specific/useWriteERC20";

const FALLBACK_CLAIM_INTERVAL_MS = 24 * 60 * 60 * 1000;
const CLAIM_STORAGE_KEY = "raj-last-claim";

const User = () => {
  const { reqToken, tokPerReq, claimInterval } = useERC20();
  const { open } = useAppKit();
  const { address } = useAppKitAccount();
  const { isRequestingToken } = useWriteERC20();
  const [now, setNow] = useState(Date.now());

  const claimIntervalMs = useMemo(() => {
    if (claimInterval === null || claimInterval === undefined) {
      return FALLBACK_CLAIM_INTERVAL_MS;
    }

    return Number(claimInterval) * 1000;
  }, [claimInterval]);

  const claimStorageKey = useMemo(() => {
    return address ? `${CLAIM_STORAGE_KEY}-${address.toLowerCase()}` : CLAIM_STORAGE_KEY;
  }, [address]);

  const [lastClaimAt, setLastClaimAt] = useState<number | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const storedValue = window.localStorage.getItem(CLAIM_STORAGE_KEY);
    return storedValue ? Number(storedValue) : null;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedValue = window.localStorage.getItem(claimStorageKey);
    setLastClaimAt(storedValue ? Number(storedValue) : null);
  }, [claimStorageKey]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const remainingTimeMs = useMemo(() => {
    if (!lastClaimAt) {
      return 0;
    }

    return Math.max(0, lastClaimAt + claimIntervalMs - now);
  }, [claimIntervalMs, lastClaimAt, now]);

  useEffect(() => {
    if (remainingTimeMs === 0 && lastClaimAt && typeof window !== "undefined") {
      window.localStorage.removeItem(claimStorageKey);
      setLastClaimAt(null);
    }
  }, [claimStorageKey, lastClaimAt, remainingTimeMs]);

  const isCoolingDown = remainingTimeMs > 0;
  const countdownLabel = isCoolingDown ? formatDuration(remainingTimeMs) : "00h 00m 00s";

  const handleWalletConnect = () => {
    open();
  };

  const handleRequestTokens = async () => {
    const isRequestSuccessful = await reqToken();
    if (!isRequestSuccessful || typeof window === "undefined") {
      return;
    }

    const claimTimestamp = Date.now();
    window.localStorage.setItem(claimStorageKey, claimTimestamp.toString());
    setLastClaimAt(claimTimestamp);
    setNow(claimTimestamp);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.14),_transparent_28%),linear-gradient(135deg,_#f8fafc_0%,_#e0f2fe_45%,_#dcfce7_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-white/70 bg-white/65 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-emerald-600">
              The RAJ
            </p>
            <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              RAJ Token Faucet
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/80 text-slate-500 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-700"
              type="button"
              aria-label="Settings"
            >
              <FiSettings />
            </button>

            <button
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5"
              type="button"
              onClick={handleWalletConnect}
            >
              {address ? formatAddress(address) : "Connect Wallet"}
            </button>
          </div>
        </header>

        <main className="mt-6 space-y-6">
          <section className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
            <article className="overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.28)]">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
                Daily Claim
              </p>
              <h2 className="mt-4 max-w-xl text-3xl font-black leading-tight sm:text-4xl">
                Claim your faucet allocation and track the next request down to the second.
              </h2>
              <p className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
                One successful request starts a 24-hour cooldown. The request button
                stays available until the mint succeeds, then it locks until the
                countdown returns to zero.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-200">
                  Faucet Amount: {formatTokenAmount(tokPerReq)} RAJ
                </div>
                <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100">
                  Network: Sepolia Testnet
                </div>
              </div>
            </article>

            <article className="rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-xl text-emerald-700">
                  <FiClock />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">
                    Cooldown
                  </p>
                  <h3 className="mt-1 text-xl font-black text-slate-900">
                    Between Requests
                  </h3>
                </div>
              </div>

              <div className="mt-6 rounded-[1.5rem] bg-slate-950 px-5 py-6 text-white">
                <p className="text-sm text-slate-300">Next request available in</p>
                <p className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                  {countdownLabel}
                </p>
                <p className="mt-3 text-sm text-slate-400">
                  {isCoolingDown
                    ? "Your wallet is currently in cooldown."
                    : "Your wallet can request tokens now."}
                </p>
              </div>
            </article>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <article className="rounded-[1.75rem] border border-white/80 bg-white/75 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                <FiDroplet />
              </div>
              <p className="mt-4 text-xs font-black uppercase tracking-[0.3em] text-slate-500">
                Faucet Amount
              </p>
              <p className="mt-2 text-3xl font-black text-slate-900">
                {formatTokenAmount(tokPerReq)}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Amount per successful request
              </p>
            </article>

            <article className="rounded-[1.75rem] border border-white/80 bg-white/75 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <FiShield />
              </div>
              <p className="mt-4 text-xs font-black uppercase tracking-[0.3em] text-slate-500">
                Contract Status
              </p>
              <p className="mt-2 text-3xl font-black text-slate-900">Verified</p>
              <p className="mt-2 text-sm text-slate-500">
                Faucet rules enforced on-chain
              </p>
            </article>

            <article className="rounded-[1.75rem] border border-white/80 bg-white/75 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                <FiGlobe />
              </div>
              <p className="mt-4 text-xs font-black uppercase tracking-[0.3em] text-slate-500">
                Network
              </p>
              <p className="mt-2 text-3xl font-black text-slate-900">Sepolia</p>
              <p className="mt-2 text-sm text-slate-500">Deployment chain</p>
            </article>
          </section>

          <section className="rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">
                  Request Tokens
                </p>
                <h2 className="mt-3 text-2xl font-black text-slate-900 sm:text-3xl">
                  Claim your daily RAJ allocation
                </h2>
                <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
                  Requests are limited to one successful claim per wallet within
                  each cooldown window.
                </p>
              </div>

              <button
                className="inline-flex min-w-56 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 px-6 py-4 text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-emerald-500/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                type="button"
                onClick={handleRequestTokens}
                disabled={isCoolingDown || isRequestingToken}
              >
                {isRequestingToken
                  ? "Requesting..."
                  : isCoolingDown
                    ? "Available After Cooldown"
                    : "Request Tokens"}
              </button>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-emerald-100 bg-emerald-50/80 p-4 text-sm text-emerald-900">
              <p className="font-semibold">
                {isCoolingDown
                  ? `Cooldown active: ${countdownLabel} remaining before your next request.`
                  : "Cooldown cleared: your request button is active."}
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default User;
