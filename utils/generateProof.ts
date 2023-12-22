import path from "path";
import * as snarkjs from "snarkjs";
import { SECRET_HASH } from "./constants";

export const generateProof = async (secret: string, address: string) => {
  const wasmPath = path.join(process.cwd(), "circuits/build/ctf_js/ctf.wasm");
  const provingKey = path.join(
    process.cwd(),
    "circuits/build/proving_key.zkey"
  );

  const inputs = {
    secret: secret,
    secretHash: SECRET_HASH,
    address: address,
  };

  try {
    const { proof, publicSignals } = await snarkjs.plonk.fullProve(
      inputs,
      wasmPath,
      provingKey
    );

    const calldataBlob = await snarkjs.plonk.exportSolidityCallData(
      proof,
      publicSignals
    );

    console.log(calldataBlob);

    const calldata = calldataBlob.split("]");

    console.log(`proof: ${calldata[0]}`);

    return {
      proof: JSON.parse(calldata[0] + "]"),
      publicSignals: JSON.parse(calldata[1] + "]"),
    };
  } catch (error) {
    console.error(error);
    throw new Error("internal server error");
  }
};
