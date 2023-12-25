import { executeTransaction } from "@/utils/executeTransaction";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const { isConnected, address } = useAccount();
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const generateProof = async () => {
    try {
      setLoading(true);
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
        address as string,
        secret
      );
      window.alert(`Transaction Hash: ${txHash}`);
    } catch (err) {
      console.log(err);
      window.alert("Error Occure, Check your console");
    } finally {
      setLoading(false);
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
      {isConnected ? (
        <div className=" flex justify-center p-4">
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-6xl font-bold text-center p-4">
                {" "}
                ZK Capture The Flag{" "}
              </h1>
              <h2 className="text-xl font-semibold text-center p-4">
                Find the text associated with the following Posiedon hash:
              </h2>
              <h2 className=" text-xl font-semibold text-center p-2 text-red-500">
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

                {loading ? (
                  // loading button
                  <button
                    className="border-2 border-gray-500 rounded-md p-2 m-2"
                    disabled
                  >
                    Loading ...
                  </button>
                ) : (
                  <button
                    className="border-2 border-gray-500 rounded-md p-2 m-2"
                    onClick={() => generateProof()}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // not connected
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-xl font-semibold text-center p-4">
            Please connect your wallet
          </h2>
        </div>
      )}
    </>
  );
}
