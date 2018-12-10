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
 * 1_000_000_000_000_000_000 = 0.1 aion
 */ 
const NONCE = 0,
      VALUE = 1, 
      GAS = 21000,
      GAS_PRICE = 10000000000, 
      TYPE = 1
class Transaction {
	constructor(args) {
		this.from = args.from || ''
		this.to = args.to || ''
		this.nonce = args.nonce || NONCE

		if (args.data)
			this.data = args.data

		this.value = args.value || VALUE
		this.gas = args.gas || GAS
		this.gasPrice = args.gasPrice || GAS_PRICE
		this.timestamp = args.timestamp || Math.floor(Date.now() * 1000)
		this.type = args.type || TYPE
	}
}

/*
 * @param messageHash: string
 * @param signature: string
 * @param rawTransaction: string
 */
class SignedTransaction {
	constructor(args) {
		this.messageHash = args.messageHash || ''
		this.signature = args.signature || ''
		this.rawTransaction = args.rawTransaction || ''
	}
}

module.exports = {
	Account,
	Transaction,
	SignedTransaction
}