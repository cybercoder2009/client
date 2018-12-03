const accounts = require('./accounts.json')
const utils = require('./utils.js')
const WebSocket = require('ws');

const host = process.argv[2] || '127.0.0.1'
const port = process.argv[3] || 8546
console.log('[host] ' + host)
console.log('[port] ' + port)

let id = 0
let tasks = {}
const TASK_UPDATE_NONCE = 'UPDATE_NONCE'
const NONCE_NOT_SENT = 'NONCE_NOT_SENT', NONCE_SENT = 'NONCE_SENT', NONCE_UPDATED = 'NONCE_UPDATED'		

const ws = new WebSocket('ws://' + host + ':' + port, {
  	perMessageDeflate: false
})

ws.on('open',()=>{
	accounts.forEach((acc, i)=>{
		
		tasks[id] = acc.addr

		ws.send(JSON.stringify({
			id: 0,
			jsonrpc: '2.0',
			method: 'eth_getBalance',
			params: [acc.addr]
		}))

		id++
	})
})

ws.on('message', (data)=>{
	console.log(data)
})