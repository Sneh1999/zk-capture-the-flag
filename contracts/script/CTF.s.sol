// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import "../src/CTF.sol";
import "../src/PlonkVerifier.sol";

contract CTFScript is Script {
    function setUp() public {}

    function run() public {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(privateKey);
        CTF ctf = new CTF(0x42372D5987d30a0fF2910739a3437150391d23A4);
        vm.stopBroadcast();
        console2.log("CTF Contract address: ", address(ctf));
    }
}
