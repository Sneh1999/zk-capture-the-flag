import { prepareWriteContract, writeContract } from "@wagmi/core";
import { CTF_ABI, CTF_ADDRESS } from "./constants";
import { hash } from "./hash";

export const executeTransaction = async (
  proof: any,
  publicSignals: any,
  address: string,
  secret: string
) => {
  try {
    const nonce = await hash([BigInt(address), BigInt(secret)]);
    const contract = await prepareWriteContract({
      address: CTF_ADDRESS,
      abi: CTF_ABI,
      functionName: "mintTokenWithProof",
      args: [nonce, proof, publicSignals],
    });

    const res = await writeContract(contract);
    console.log(res);
    return res.hash;
  } catch (error) {
    console.error(error);
    throw new Error("internal server error");
  }
};
