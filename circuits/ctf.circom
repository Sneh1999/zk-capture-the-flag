pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/poseidon.circom";


template Main () {
    // public signals
    signal output nonce;
    signal input secretHash;
    signal input address;

    // private inputs
    signal input secret;

    component secretHasher = Poseidon(1);
    secretHasher.inputs[0] <== secret;

    secretHasher.out === secretHash;

    // create a unique nonce 
    component nonceHasher = Poseidon(2);
    nonceHasher.inputs[0] <== address;
    nonceHasher.inputs[1] <== secret;

    nonce <== nonceHasher.out;
}

component main {public [secretHash, address]} = Main();