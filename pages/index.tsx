import { TerminalController } from "@/components/terminal";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <Head>
        <title>ZK Capture The Flag </title>
      </Head>
      <div className="h-screen w-screen overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1e3752] via-[#192532] to-[#010000] flex flex-col">
        <div className="flex justify-between items-center px-4 py-2">
          <span className="font-bold tracking-wide text-4xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            ⛫ ZK Capture the Flag
          </span>
          <ConnectButton />
        </div>

        <div className="flex flex-col mt-10 items-center justify-center">
          {isConnected ? (
            <div className="w-[50vw] mx-auto my-auto text-pretty rounded-md border border-gray-700">
              <TerminalController />
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-xl font-semibold text-center p-4">
                Please connect your wallet
              </h2>
            </div>
          )}
        </div>

        <div className="grow" />

        <div className="flex justify-center py-4">
          <Link
            href={"https://learnweb3.io/lessons/abc"}
            target="_blank"
            className="text-xs text-gray-500 hover:text-gray-400 transition-all"
          >
            Based on a lesson from LearnWeb3
          </Link>
        </div>
      </div>
    </>
  );
}
