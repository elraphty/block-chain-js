/**
 * Created by Raphael Osaze Eyerin
 * On 3rd June 2019
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
     * 
     * @param genesisBlock 
     * @param currentNodeUrl 
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
     * @param nonce 
     * @param previousBlockHash 
     * @param hash 
     * @param callback 
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

    addNewTransaction() {

    }


    /**
     * This method hashes a block by taking the previous block hash current block data and nonce
     * it returns a string
     * @param previousBlockHash 
     * @param currentBlockData 
     * @param nonce 
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
     * @param previousBlockHash 
     * @param currentBlockData 
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
     * @param hash 
     */
    getBlock(hash: string) {

    }

    /**
     * 
     * @param transactionId 
     */
    getTransaction(transactionId: string) {

    }

    /**
     * This function takes it an address as a string and seaches the blockchain for all trasactions with this adrress 
     * @param address 
     */
    getAddressData(address: string) {

    }


}

export default BlockChain;