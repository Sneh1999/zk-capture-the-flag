import { generateProof } from "@/utils/generateProof";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { address, secret } = req.body;

    if (!address || !secret) {
      res.status(400).json({ error: "Missing address or secret" });
      return;
    }

    const proof = await generateProof(secret, address);
    if (proof.proof === "") {
      return res.status(403).json({ error: "Proving failed" });
    }

    res.status(200).json({ proof });
  } catch (error) {
    console.error(error);
    res.status(500).json("internal server error");
  }
}
