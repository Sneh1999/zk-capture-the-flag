// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "./PlonkVerifier.sol";

contract CTF is ERC20 {
    PlonkVerifier public verifier;

    uint256 public immutable hash =
        15514860137957992411716963528347796652230224498239149843465251542348029236386;

    mapping(uint256 => bool) public usedNonces;

    constructor(address _verifier) ERC20("TokenMint", "TM") {
        verifier = PlonkVerifier(_verifier);
    }

    function mintTokenWithProof(
        uint256 nonce,
        uint256[24] calldata proof
    ) public {
        require(!usedNonces[nonce], "nonce already used");

        uint256[3] memory publicInputs = [
            nonce,
            hash,
            uint256(uint160(msg.sender))
        ];

        require(verifier.verifyProof(proof, publicInputs), "invalid proof");

        _mint(msg.sender, 1 ether);
        usedNonces[nonce] = true;
    }
}
