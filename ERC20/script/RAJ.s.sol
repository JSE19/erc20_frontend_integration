// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {RAJ} from "../src/RAJ.sol";

contract RAJScript is Script {
    RAJ public raj;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        raj = new RAJ("RAJTOKEN", "RAJ");

        vm.stopBroadcast();
    }
}
