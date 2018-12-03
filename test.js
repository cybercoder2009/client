const hex_prefix_remove = require('./utils.js').hex_prefix_remove
const hex_prefix_append = require('./utils.js').hex_prefix_append
const to_aion = require('./utils.js').to_aion

console.log('hex_prefix_remove')
console.log('"" -> "' + hex_prefix_remove('') + '"')
console.log('"0" -> "' + hex_prefix_remove('0') + '"')
console.log('"0x" -> "' + hex_prefix_remove('0x') + '"')
console.log('"0x0" -> "' + hex_prefix_remove('0x0') + '"')

console.log('hex_prefix_append')
console.log('"" -> "' + hex_prefix_append('') + '"')
console.log('"0" -> "' + hex_prefix_append('0') + '"')
console.log('"0x" -> "' + hex_prefix_append('0x') + '"')
console.log('"0x0" -> "' + hex_prefix_append('0x0') + '"')

console.log('to_aion')
console.log('"0DE0B6B3A7640000" -> ' + to_aion('0xDE0B6B3A7640000'))