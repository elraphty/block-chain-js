/**
 * Created by Raphael Osaze Eyerin
 * On 3rd June 2019
 * A javascript library that enabkes developers easily create their own block chain network
 * 
 */

// import sha256 from 'sha256';
const sha256 = require('sha256');

class BlockChain {

    chain: any[];
    pendingTransactions: any[];
    networkNodes: any[];
    currentNodeUrl: String;


    /**
     * constructor method accepts a genesis block and current node url it then add the genesis block to the blockcahin
     * @param genesisBlock Object
     * @param currentNodeUrl string
     */
    constructor(genesisBlock: any, currentNodeUrl: string) {
        this.chain = [];
        this.pendingTransactions = [];
        this.currentNodeUrl = currentNodeUrl;
        this.networkNodes = [];

        this.addNewBlock(genesisBlock.nonce, genesisBlock.previousBlockHash, genesisBlock.hash, (newBlock: any) => { });
    }

    /**
     * This function creates a new block and add it to the blockchain
     * @param nonce number
     * @param previousBlockHash string 
     * @param hash string
     * @param callback function
     */
    addNewBlock(nonce: number, previousBlockHash: string, hash: string, callback: any) {
        const newBlock = {
            index: this.chain.length + 1,
            timestamp: Date.now(),
            transactions: this.pendingTransactions,
            nonce,
            hash,
            previousBlockHash
        };

        this.pendingTransactions = [];

        this.chain.push(newBlock);

        callback(newBlock);
    }

    /**
     * This method returns the last block
     * @param callback is a function
     */
    getLastBlock(callback: Object) {

    }

    addNewTransaction() {

    }

    addTransactionToPendingTransaction(transactionObj: Object) {

    }


    /**
     * This method hashes a block by taking the previous block hash current block data and nonce
     * it returns a string
     * @param previousBlockHash string
     * @param currentBlockData Object
     * @param nonce number
     */
    hashBlock(previousBlockHash: string, currentBlockData: Object, nonce: number): string {
        const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
        const hash = sha256(dataAsString);

        return hash;
    }

    /**
     * Repeatedly hash block of data till it finds correct hash
     * Uses current block data for the hash and also previous hash
     * continously changes nonce value until it finds the correct hash
     * returns to us the correct nonce value that creates the correct hash
     * @param previousBlockHash string 
     * @param currentBlockData  Object
     */
    proofOfWork(previousBlockHash: string, currentBlockData: Object) {

        let nonce: number = 0;
        let hash: string = this.hashBlock(previousBlockHash, currentBlockData, nonce);

        while (hash.substring(0, 4) !== process.env.SECRET_CODE) {
            nonce++;
            hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
            // console.log('hash', hash, hash.substring(0, 4));
        }

        return nonce;
    }

    /**
     * 
     * @param blockchain object
     */
    chainIsValid(blockchain: any[]): boolean {
        let validChain = true;

        for (let i: number = 1; i < blockchain.length; i++) {
            const currentBlock: any = blockchain[i];
            const prevBlock: any = blockchain[i - 1];

            const blockHash: string = this.hashBlock(prevBlock['hash'],
                {
                    index: currentBlock['index'],
                    transactions: currentBlock['transactions'],
                },

                currentBlock['nonce']
            );

            // console.log('current Block', currentBlock);

            if (blockHash.substring(0, 4) !== process.env.SECRET_CODE) validChain = false;
            if (currentBlock['previousBlockHash'] !== prevBlock['hash']) validChain = false; // chain not valid

        }

        const genesisBlock = blockchain[0];

        const correctNonce = genesisBlock['nonce'] === 2000;
        const correctPreviousHash = genesisBlock['previousBlockHash'] === 'IIIIIOOOOOOOO';
        const correctHash = genesisBlock['hash'] === 'HHHHHHHHYYYY';
        const correctTransactions = genesisBlock['transactions'].length === 0;

        if (!correctNonce || !correctPreviousHash || !correctHash || !correctTransactions) {
            console.log('Lastcheck incorect');
            validChain = false;
        }

        return validChain;

    }

    /**
     * This method takes in a particular hash and returns the block with the particular hash
     * @param hash string
     */
    getBlock(hash: string) {

    }

    /**
     * This method takes in a transactionId and returns all data relted with that transaction id
     * @param transactionId string
     */
    getTransaction(transactionId: string, callback: Object) {

    }

    /**
     * This method takes in an address as a string and seaches the blockchain for all trasactions with this adrress 
     * @param address string
     * @param callback function
     */
    getAddressData(address: string, callback: Object) {

    }


}

export default BlockChain;