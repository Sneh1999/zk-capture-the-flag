import * as snarkjs from "snarkjs";
import { SECRET_HASH } from "./constants";

export const generateProof = async (secret: string, address: string) => {
  const wasmFileRes = await fetch("/ctf.wasm");
  const wasmFile = await wasmFileRes.arrayBuffer();

  const zkeyFileRes = await fetch("/proving_key.zkey");
  const zkeyFile = await zkeyFileRes.arrayBuffer();

  const inputs = {
    secret: "0x" + Buffer.from(secret).toString("hex"),
    secretHash: SECRET_HASH,
    address: address,
  };

  try {
    const { proof, publicSignals } = await snarkjs.plonk.fullProve(
      inputs,
      new Uint8Array(wasmFile),
      new Uint8Array(zkeyFile)
    );

    const calldataBlob = await snarkjs.plonk.exportSolidityCallData(
      proof,
      publicSignals
    );

    const splitProofAndPubSigs = calldataBlob.split("]");

    const proofArrayStr = splitProofAndPubSigs[0] + "]";
    const proofArray = JSON.parse(proofArrayStr);

    return proofArray;
  } catch (error) {
    console.error(error);
    throw new Error("internal server error");
  }
};
