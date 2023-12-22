import path from "path";
import * as snarkjs from "snarkjs";
import { buildPoseidon } from "circomlibjs";

const hash = async (secret: bigint[]) => {
  const p = buildPoseidon();

  const poseidon = await p;

  return poseidon.F.toObject(poseidon(secret));
};

export const generateProof = async (secret: string, address: string) => {
  const wasmPath = path.join(process.cwd(), "circuits/build/ctf_js/ctf.wasm");
  const provingKey = path.join(
    process.cwd(),
    "circuits/build/proving_key.zkey"
  );

  const hashedSecret = await hash([BigInt(secret)]);

  console.log(hashedSecret);
  const inputs = {
    secret: secret,
    secretHash:
      "3607056778794995795434385085847334626017449707154072104308864676240828390282",
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

    const calldata = calldataBlob.split(",");

    console.log(calldata);

    return {
      proof: calldata[0],
      publicSignals: JSON.parse(calldata[1]),
    };
  } catch (error) {
    console.error(error);
    throw new Error("internal server error");
  }
};
