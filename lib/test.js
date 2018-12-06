const assert = require('assert')
const { create } = require('./keypair.js')
const { Transaction, SignedTransaction } = require('./types.js')
const { prefix_remove, prefix_prepend, to_buffer } = require('./utils.js')

describe('utils', () => {

	describe('keypair.js', () => {

		it('create()', () => {
			
			let acc0 = create()
			let acc1 = create(acc0.private_key)
			assert.equal(acc0.private_key_hex, acc1.private_key_hex)
			assert.equal(acc0.public_key_hex, acc1.public_key_hex)
			assert.equal(acc0.address, acc1.address)

			// web3 console: 
			// web3.eth.accounts.privateKeyToAccount('0x9ccceff2c30a71642d0d65568617e3f5706648b82ae752708dab1191e9c0961e59dd38036bc11d65c1694d21f9ca8d35c70b8ad346e39a120ae77be23ae02b55')
			let private_key_2 = to_buffer('0x9ccceff2c30a71642d0d65568617e3f5706648b82ae752708dab1191e9c0961e59dd38036bc11d65c1694d21f9ca8d35c70b8ad346e39a120ae77be23ae02b55') 			
			let acc2 = create(private_key_2)
			assert.equal('0xa009bfd263a71814e5c3986ebd3632024b33030aefc66ec50dd7c67d0fbf6f9d', acc2.address)
			let private_key_1 = to_buffer('0xed96a5a6f33ac6b4efd2da756e4c0912f9682452c8888dbea1f902faae0a6f748c31f367b3e6fee7c1f3e636cff22a2e7b67b15663ab7a6726b11e663aeae39a')
			let acc3 = create(private_key_1)
			assert.equal('0xa065b9c200a7214363fb3a879a3216b471911ada863526be0e5c306ddb30451c', acc3.address)
		})
	})

	describe('types.js', () => {

		it('Transaction', () => {
			let from = 'from',
                to = 'to',
                value = 123,
                gas = 456
			let tx = new Transaction({from, to, value, gas})
			assert.equal(from, tx.from)
			assert.equal(to, tx.to)
			assert.equal(value, tx.value)
			assert.equal(gas, tx.gas)
		})
	})

	describe('utils.js', () => {

		it('prefix_remove(hex)', () => {
			assert.equal(prefix_remove(''), '')
			assert.equal(prefix_remove('0'), '0')
			assert.equal(prefix_remove('0x'), '')
			assert.equal(prefix_remove('0x0'), '0')
		})

		it('prefix_prepend(hex)', () => {
			assert.equal(prefix_prepend(''), '0x')
			assert.equal(prefix_prepend('0'), '0x0')
			assert.equal(prefix_prepend('0x'), '0x')
			assert.equal(prefix_prepend('0x0'), '0x0')
		})

		it('to_buffer()', () => {
			// let buf = to_buffer('123')
			// assert.equal(buf.length, 1)
			// assert.equal(buf[0], 0x7b)
		})
	})
})