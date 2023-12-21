pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/poseidon.circom";


template Main () {
    // public inputs
    signal input hash;
    signal output index;
    signal input address;

    // private inputs
    signal input hashedInput;

    component hasher = Poseidon(1);
    hasher.inputs[0] <== hashedInput;

    hasher.out === hash;

    // create a unique index for each address
    component indexHasher = Poseidon(2);
    indexHasher.inputs[0] <== address;
    indexHasher.inputs[1] <== hashedInput;

    index <== indexHasher.out;
}

component main {public [hash, address]} = Main();