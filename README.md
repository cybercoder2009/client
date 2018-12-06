1. Create new account
@return
```
 @return 
 Account {
     private_key,      // Buffer
     private_key_hex,  // string
     public_key,       // Buffer
     public_key_hex,   // string
     address,          // string
 }
```
usage:
```
const { create } = require('./keypair.js')
let account = create()
```

2. Generate account from private key
@params private_key Buffer
@return 
```
Account {
     private_key,      // Buffer
     private_key_hex,  // string
     public_key,       // Buffer
     public_key_hex,   // string
     address,          // string
}
```
usage:
```
const { to_buffer } = require('./utils.js')
const { create } = require('./keypair.js')
let account = create(to_buffer('0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'))
```
