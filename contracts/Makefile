#!/usr/bin/make
include .env

deploy: .env src/CTF.sol src/PlonkVerifier.sol script/Deployer.s.sol
	forge script script/Deployer.s.sol:Deployer --broadcast --verify --rpc-url ${RPC_URL} --etherscan-api-key ${BLOCK_EXPLORER_API_KEY}

.PHONY: deploy