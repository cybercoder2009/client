const BN = require('bn.js')
const { AionLong } = require('aion-rlp')

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
        return Buffer.from(new BN(val, 10).toArray())
    }

    // string
    if (typeof val === 'string') {
        return Buffer.from(prefix_remove(val), 'hex')
    }

    // anything else
    return Buffer.from(val, 'hex')
}

function buffer_to_uint8_array(buf){
    let ab = new ArrayBuffer(buf.length);
    let view = new Uint8Array(ab);
    for (let i = 0, m = buf.length; i < m; ++i) {
        view[i] = buf[i];
    }
    return ab;
}


const MAX_LONG = new BN('9223372036854775807')
function to_long(val) {
    let num

    if (
        val === undefined ||
        val === null ||
        val === '' ||
        val === '0x'
    ) {
        return null
    }

    if (typeof val === 'string') {
        if (
            val.indexOf('0x') === 0 ||
            val.indexOf('0') === 0 ||
            isHex(val) === true ||
            isHexStrict(val) === true
        ) {
            num = new BN(removeLeadingZeroX(val), 16)
        } else {
            num = new BN(val, 10)
        }
    }

    if (typeof val === 'number') {
        num = new BN(val)
    }

    return new AionLong(num)
}

module.exports = {
    prefix_remove,
    prefix_prepend,
    to_buffer,
    to_long
}