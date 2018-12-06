class Account {
	constructor(args) {
        this.private_key = args.private_key || Buffer.from([]),
        this.private_key_hex = args.private_key_hex || '0x',
        this.public_key = args.public_key || Buffer.from([])
        this.public_key_hex = args.public_key_hex || '0x'
        this.address = args.address || '0x'
	}
}

/*
 * 100_000_000_000_000_000 = 0.1 aion
 */ 
const VALUE = 1, GAS = 21000, TYPE = 1
class Transaction {
	constructor(args) {
		this.from = args.from || ''
		this.to = args.to || ''
		this.data = args.data || ''
		this.value = args.value || 1
		this.gas = args.gas || 21000
		this.type = TYPE
	}
}

module.exports = {
	Account,
	Transaction
}