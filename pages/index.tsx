import { executeTransaction } from "@/utils/executeTransaction";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const { isConnected, address } = useAccount();
  const [secret, setSecret] = useState("");
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  const generateProof = async () => {
    try {
      // create post request to generate proof
      const res = await fetch("/api/generateProof", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: secret,
          address: address,
        }),
      });
      const data = await res.json();
      console.log(data);
      const txHash = await executeTransaction(
        data.proof.proof,
        data.proof.publicSignals,
        address as string,
        secret
      );
      window.alert(`Transaction Hash: ${txHash}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title> ZK Capture The Flag </title>
      </Head>
      <div className="flex justify-end items-center p-4">
        <ConnectButton />
      </div>
      <div className=" flex justify-center p-4">
        {/*  Create a text box and a submit button */}
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-center p-4">
              {" "}
              ZK Capture The Flag{" "}
            </h1>
            <h2 className="text-xl font-semibold text-center p-4">
              Find the text associated with the following hash:
              3607056778794995795434385085847334626017449707154072104308864676240828390282
            </h2>

            {/*  textbox */}
            <div className="flex flex-col justify-center items-center">
              <input
                className="border-2 border-gray-500 text-black rounded-md p-2 m-2"
                type="text"
                placeholder="Enter the text"
                onChange={(e) => setSecret(e.target.value)}
              />
              {isConnected ? (
                <button
                  className="border-2 border-gray-500 rounded-md p-2 m-2"
                  onClick={() => generateProof()}
                >
                  Submit
                </button>
              ) : (
                <p className="text-red-500"> Please Connect Your Wallet </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
