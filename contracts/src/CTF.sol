// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "./PlonkVerifier.sol";

contract CTF is ERC20 {
    uint256 public hash =
        uint256(
            3607056778794995795434385085847334626017449707154072104308864676240828390282
        );
    PlonkVerifier public verifier;
    mapping(uint256 => bool) public usedIndexes;

    constructor(address _verifier) ERC20("TokenMint", "TM") {
        verifier = PlonkVerifier(_verifier);
    }

    function mintTokenWithProof(
        uint256 index,
        uint256[24] calldata proof
    ) public {
        require(!usedIndexes[index], "index already used");

        uint256[3] memory pubSignals;
        pubSignals[0] = hash;
        pubSignals[1] = index;
        pubSignals[2] = uint256(uint160(msg.sender));

        require(verifier.verifyProof(proof, pubSignals), "invalid proof");

        _mint(msg.sender, 1);
        usedIndexes[index] = true;
    }
}
