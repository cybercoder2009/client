const { randomBytes, sign } = require('tweetnacl')
const { blake2b_256 } = require('./crypto.js')
const { Account } = require('./types.js')
const { to_buffer, prefix_prepend, prefix_remove } = require('./utils.js') 

/* 
 * @param public_key: Buffer
 * @return string
 */
function to_address(public_key) {
    let hash = Buffer.from(blake2b_256(public_key)).slice(1, 32)
    return '0xa0' + hash.toString('hex')
}

/*
 * @param _private_key: Buffer
 * @return {
 *     private_key: Buffer,
 *     private_key_hex: string,
 *     public_key: Buffer,
 *     public_key_hex: string
 *     address: string
 * }
 */
function create(private_key) { 

    let keypair,
        private_key_hex, 
        public_key,
        public_key_hex,
        address

    if(private_key) {
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

module.exports = {
    create
}