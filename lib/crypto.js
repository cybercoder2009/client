const blake2b = require('blake2b')

function blake2b_256(val) {  
    let out = new Uint8Array(32)
    blake2b(32)
      .update(val)
      .digest(out)
    return out
}

module.exports = {
    blake2b_256
}