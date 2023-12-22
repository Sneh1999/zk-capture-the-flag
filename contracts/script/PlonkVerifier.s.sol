// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import "../src/CTF.sol";
import "../src/PlonkVerifier.sol";

contract PlonkVerifierScript is Script {
    function setUp() public {}

    function run() public {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(privateKey);
        PlonkVerifier pf = new PlonkVerifier();
        vm.stopBroadcast();
        console2.log("Plonk Verifier Contract address: ", address(pf));
    }
}
