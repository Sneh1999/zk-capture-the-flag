import { buildPoseidon } from "circomlibjs";

export const hash = async (args: bigint[]) => {
  const p = buildPoseidon();

  const poseidon = await p;

  return poseidon.F.toObject(poseidon(args));
};
