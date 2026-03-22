// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {RAJ} from "../src/RAJ.sol";

contract RAJTest is Test {
    RAJ public raj;
    address owner;
    address user;

    function setUp() public {
        owner = makeAddr("owner");
        vm.prank(owner);
        raj = new RAJ("RAJTOKEN", "RAJ");

        user = makeAddr("user");
    }

    function testMintByOwner() public {
        vm.expectRevert();
        vm.prank(user);
        raj.mint(10 ether);

        vm.prank(owner);
        raj.mint(10 ether);
    }

    function testRequestToken() public {
        vm.prank(owner);
        raj.mint(10 ether);

        vm.prank(user);
        raj.requestToken();

        assertEq(raj.balanceOf(user), 1 ether);
    }

    
}
