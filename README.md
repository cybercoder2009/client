1. Create new account
'''
const { create } = require('./keypair.js')
/*
 * @return 
 * Account {
 *     private_key,      // Buffer
 *     private_key_hex,  // string
 *     public_key,       // Buffer
 *     public_key_hex,   // string
 *     address,          // string
 * }
 */
usage: create()
eg:    let account = create()
'''
2. Generate account from private key
'''
const { to_buffer } = require('./utils.js')
const { create } = require('./keypair.js')

/*
 * @params private_key Buffer
 * @return 
 * Account {
 *     private_key,      // Buffer
 *     private_key_hex,  // string
 *     public_key,       // Buffer
 *     public_key_hex,   // string
 *     address,          // string
 * }
 */
useage: create(private_key) 
eg:     let account = create(to_buffer('0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'))
'''