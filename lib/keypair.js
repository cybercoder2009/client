const rlp = require('aion-rlp')
const { randomBytes, sign } = require('tweetnacl')
const { blake2b_256 } = require('./crypto.js')
const { Account, SignedTransaction } = require('./types.js')
const { to_buffer, to_long, prefix_prepend, prefix_remove } = require('./utils.js') 

/* 
 * @param public_key: Buffer
 * @return string
 */
const PREFIX = '0xa0'
function to_address(public_key) {
    let hash = Buffer.from(blake2b_256(public_key)).slice(1, 32)
    return PREFIX + hash.toString('hex')
}

/*
 * @param private_key: Buffer
 * @return Account{
 *     private_key:     Buffer,
 *     private_key_hex: string,
 *     public_key:      Buffer,
 *     public_key_hex:  string,
 *     address:         string
 * }
 */
function create(private_key) { 

    let keypair,
        private_key_hex, 
        public_key,
        public_key_hex,
        address

    if(private_key) {
        if(!Buffer.isBuffer(private_key)){
            throw new Error('<invalid-type Buffer-required>')
        }
        keypair = sign.keyPair.fromSecretKey(private_key)
        private_key_hex = prefix_prepend(private_key.toString('hex'))                
    } else {
        keypair = sign.keyPair.fromSeed(randomBytes(32))
        private_key = Buffer.from(keypair.secretKey)
        private_key_hex = prefix_prepend(private_key.toString('hex'))
    }

    public_key = Buffer.from(keypair.publicKey)
    public_key_hex = prefix_prepend(public_key.toString('hex'))
    address = to_address(public_key) 
    
    return new Account({
        private_key,
        private_key_hex,
        public_key,
        public_key_hex,
        address,
    })
}

/*
 * @param tx: Transaction {
 *     from:      string,
 *     to:        string,
 *     nonce:     number,
 *     data:      string,
 *     value:     number,
 *     gas:       number,
 *     gasPrice:  number,
 *     timestamp: number,
 *     type:      number
 * }
 * @return SignedTransaction{
 *     messageHash:    Buffer,
 *     signature:      string,
 *     rawTransaction: Buffer
 * }
 */
function sign_transaction(tx, private_key) {
    
    // console.log(tx)
    // console.log('nonce: ' + tx.nonce)
    // console.log('to: ' + tx.to)
    // console.log('value: ' + tx.value)
    // console.log('data: ' + tx.data)
    // console.log('timestamp: ' + tx.timestamp)
    // console.log('gas: ')
    // console.log(to_long(tx.gas))
    // console.log('gasPrice: ')
    // console.log(to_long(tx.gasPrice))
    // console.log('type: ')
    // console.log(to_long(tx.type))
    // console.log(rlp.encode.toString())
    let rlped = rlp.encode([
        tx.nonce,
        tx.to,
        tx.value,
        tx.data,
        tx.timestamp,
        to_long(tx.gas),
        to_long(tx.gasPrice),
        to_long(tx.type)
    ]);
    let hash = blake2b_256(rlped)
    let signature = to_buffer(sign.detached(hash, private_key))
    let keypair = create(private_key)
    let pub_sig = Buffer.concat([keypair.public_key, signature], 96)
    
    // ???
    let raw = rlp.encode(rlp.decode(rlped).concat(pub_sig))
    return new SignedTransaction({
        messageHash: prefix_prepend(Buffer.from(hash).toString('hex')),
        signature: prefix_prepend(pub_sig.toString('hex')),
        rawTransaction: prefix_prepend(raw.toString('hex'))
    })
}

module.exports = {
    create,
    sign_transaction
}