import { formatUnits } from "ethers";

const TOKEN_DECIMALS = 18;

export const formatAddress = (walletAddress: string): string => {
  const firstPart = walletAddress.slice(0, 4);
  const lastPart = walletAddress.slice(-6);

  return `${firstPart}...${lastPart}`;
};

export const formatTokenAmount = (
  value: bigint | null | undefined,
  maximumFractionDigits = 4
): string => {
  if (value === null || value === undefined) {
    return "Loading...";
  }

  const formattedValue = formatUnits(value, TOKEN_DECIMALS);
  const [wholePart, fractionPart = ""] = formattedValue.split(".");
  const normalizedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const trimmedFraction = fractionPart.replace(/0+$/, "").slice(0, maximumFractionDigits);

  return trimmedFraction
    ? `${normalizedWholePart}.${trimmedFraction}`
    : normalizedWholePart;
};

export const formatDuration = (milliseconds: number): string => {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, "0")}h ${minutes
    .toString()
    .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;
};
