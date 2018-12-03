const accounts = require('./accounts.json')
const utils = require('./utils.js')
const WebSocket = require('ws');

const host = process.argv[2] || '127.0.0.1'
const port = process.argv[3] || 8546
const loop_interval = process.argv[4] || 1000
console.log('[host] ' + host)
console.log('[port] ' + port)
console.log('[loop-interval] ' + loop_interval + 'ms')

let id = 0
let tasks = {}
const TASK_UPDATE_NONCE = 'UPDATE_NONCE'
const NONCE_NOT_SENT = 'NONCE_NOT_SENT', NONCE_SENT = 'NONCE_SENT', NONCE_UPDATED = 'NONCE_UPDATED'		

const ws = new WebSocket('ws://' + host + ':' + port, {
  	perMessageDeflate: false
})

ws.on('open',()=>{

	// prepare data
	accounts.forEach((account, index)=>{
		account.nonce_check = NONCE_NOT_SENT
		account.nonce = 0
	})
  	
  	// update accounts nonce
	let nonce_check = setInterval(()=>{
		let nonce_update_done = true
		let updated_accounts = 0
		accounts.forEach((account, index)=>{
			switch (account.nonce) {
				case NONCE_NOT_SENT:
					account.nonce_check = NONCE_SENT
					id++
					tasks[id] = {
						label: TASK_UPDATE_NONCE,
						account: account
					}
					ws.send(JSON.stringify({
						id: id,
						jsonrpc: '2.0',
						method: 'eth_getTransactionCount',
						params: [account.addr]
					})) 
				break;
				case NONCE_SENT:
				break;
				case NONCE_UPDATED:
					updated_accounts++
				break;
			}
		})
		// console.log('updated_accounts ' + updated_accounts)
		// if (updated_accounts == accounts.length) {
		// 	console.log('[all-accounts-nonce-updated]')
		// 	clearInterval(nonce_check)
		// }
	},loop_interval)
});
ws.on('message', (data)=>{
	console.log('message ' + data)
	let json = JSON.parse(data)
	let task = tasks[json.id]
	if (task) {
		switch(task.label) {
			case TASK_UPDATE_NONCE:
			task.account.nonce = parseInt(utils.prefix_remove(json.result))
			task.account.nonce_check = NONCE_UPDATED
			console.log(task.account)
			break;
		}
	}
})