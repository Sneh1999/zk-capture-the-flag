// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "./PlonkVerifier.sol";

contract CTF is ERC20 {
    uint256 public hash =
        uint256(
            3607056778794995795434385085847334626017449707154072104308864676240828390282
        );
    uint256 public nextTokenId;
    PlonkVerifier public verifier;
    mapping(uint256 => bool) public usedIndexes;

    constructor(address _verifier) ERC20("TokenMint", "TM") {
        verifier = PlonkVerifier(_verifier);
    }

    function mintTokenWithProof(
        uint256 index,
        uint256[24] calldata proof,
        uint256[3] calldata pubSignals
    ) public {
        require(!usedIndexes[index], "index already used");

        require(verifier.verifyProof(proof, pubSignals), "invalid proof");
        _mint(msg.sender, nextTokenId);
        nextTokenId++;
        usedIndexes[index] = true;
    }
}
