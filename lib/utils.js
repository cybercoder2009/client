const BN = require('bn.js')

function prefix_remove(hex){
    if (typeof hex === 'string' && hex.indexOf('0x') >= 0) {
        if(hex.length == 2)
            return ''
        else 
            return hex.substr(2, hex.length -1) 
    } 
    return hex
}

function prefix_prepend(hex) {
    if (hex.indexOf('0x') < 0)
        hex = '0x' + hex
    return hex
}

function to_buffer(val) {
    if (val === undefined || val === null) {
        return Buffer.from([])
    }

    // buffer or array
    if (Array.isArray(val) === true || Buffer.isBuffer(val) === true) {
        return Buffer.from(val)
    }

    // number
    // if (isNumber(val) === true || BN.isBN(val) === true) {
    if (BN.isBN(val) === true) {
        return Buffer.from(new BN(val).toArray())
    }

    // string
    if (typeof val === 'string') {
        return Buffer.from(prefix_remove(val), 'hex')
    }

    // anything else
    return Buffer.from(val, 'hex')
}

module.exports = {
    prefix_remove,
    prefix_prepend,
    to_buffer
}