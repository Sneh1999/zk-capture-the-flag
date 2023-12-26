import { prepareWriteContract, writeContract } from "@wagmi/core";
import { CTF_ABI, CTF_ADDRESS } from "./constants";
import { hash } from "./hash";
import { AbiParameterToPrimitiveType, ExtractAbiFunction } from "abitype";

type ProofArray = AbiParameterToPrimitiveType<
  ExtractAbiFunction<typeof CTF_ABI, "mintTokenWithProof">["inputs"][1]
>;

export const executeTransaction = async (
  proof: ProofArray,
  address: string,
  secret: string
) => {
  try {
    const nonce = await hash([
      BigInt(address),
      BigInt("0x" + Buffer.from(secret).toString("hex")),
    ]);

    const contract = await prepareWriteContract({
      address: CTF_ADDRESS,
      abi: CTF_ABI,
      functionName: "mintTokenWithProof",
      args: [nonce, proof],
    });

    const res = await writeContract(contract);
    return res.hash;
  } catch (error) {
    console.error(error);
    throw new Error("internal server error");
  }
};
