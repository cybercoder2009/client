const { create } = require('./lib/keypair.js')
const CREATE = 'CREATE'

const action = process.argv[2] || CREATE
console.log('[action] ' + action)

switch(action) {
    case CREATE:
	let account = create()
	console.log(account)
        break
    default:
	break
}
