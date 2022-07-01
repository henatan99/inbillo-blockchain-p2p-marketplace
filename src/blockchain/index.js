// const myCripto = require('crypto')
const SHA256 = require('crypto-js/sha256');
var crypto = require('crypto');

class Block {    
    constructor(index, timestamp, transaction, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.transaction = transaction;
        this.previousHash = previousHash;
        this.hash = '';
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transaction).toString());
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')){
            this.hash = this.calculateHash();
        }
        console.log('Block mined: ', this.hash);
    }
}

class BlockChain {
    static instance = new BlockChain();

    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, '01/01/2017', 'Genesis block', '0');
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(transaction, senderPublicKey, signature) {
        const verifier = crypto.createVerify('SHA256');
        verifier.update(transaction.toString());
        
        const isValid = verifier.verify(senderPublicKey, signature);

        if(isValid) {
            const newBlock = new Block(this.lastBlock.hash, transaction);
            // this.mine(newBlock.nonce);
            this.chain.push(newBlock);
        }
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i ++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(JSON.stringify(currentBlock.hash) !== JSON.stringify(currentBlock.calculateHash())){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
} 

class Transaction {
    constructor(amount, payer, payee) {
        this.amount = amount;
        this.payee = payee,
        this.payer = payer;
    }

    toString() {
        return JSON.stringify(this);
    }
}

class Wallet {
    publicKey;
    privateKey;

    constructor() {
        const keypair = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
        });

        this.privateKey = keypair.privateKey;
        this.publicKey = keypair.publicKey;
    }

    sendMoney(amount, payeePublickey) {
        const transaction = new Transaction(amount, this.publicKey, payeePublickey);
        console.log('transaction', transaction);
        const sign = crypto.createSign('SHA256');

        const signature = sign.sign(this.privateKey);
        BlockChain.instance.addBlock(transaction, this.publicKey, signature);
    }
}

// let savjeeCoin = new BlockChain;

// savjeeCoin.addBlock(new Block(1, '10/07/2017', {amount: 4}));
// savjeeCoin.addBlock(new Block(2, '12/07/2017', {amount: 4}));

// console.log('Is blockchain valid?', savjeeCoin.isChainValid())

// savjeeCoin.chain[1].data= { amount: 100};

// console.log('Is blockchain valid? ', savjeeCoin.isChainValid());

// console.log(savjeeCoin);

const satoshi = new Wallet();
const bob = new Wallet();
const alice = new Wallet();

satoshi.sendMoney(50, bob.publicKey);
bob.sendMoney(23, alice.publicKey);
alice.sendMoney(5, bob.publicKey);

console.log(BlockChain.instance);