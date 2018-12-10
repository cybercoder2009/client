const WebSocket = require('ws');
const BigNumber = require('./lib/bignumber.js')

function to_aion(hex){
	hex = prefix_remove(hex)
	let bn = new BigNumber(hex)
	let decimal = new BigNumber(10^18)
	return bn
}

function random(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

function sign(tx,account){
	let result = {};
	let preEncodeSeq = [];
	let expectSeq =['nonce','to','value','data','timestamp','gas','gasPrice','type'];
	tx.timestamp = txObj.timestamp || Date.now() * 1000;
	tx.value = tx.value || 0;
	tx.gasPrice = tx.gasPrice || 0;

	result.readable = tx;
	
	if(!/^0x/.test(txObj.value)) txObj.value = '0x'+parseInt(txObj.value).toString(16);
	if(!/^0x/.test(txObj.gasPrice)) txObj.gasPrice = '0x'+ parseInt(txObj.gasPrice).toString(16);
	if(!/^0x/.test(txObj.gas)) txObj.gas = '0x'+parseInt(txObj.gas).toString(16);
		
	txObj.gasPrice = toAionLong(txObj.gasPrice);
	txObj.gas = toAionLong(txObj.gas);
	txObj.type = toAionLong(txObj.type || 1);

	
	expectSeq.forEach((property)=>{preEncodeSeq.push(txObj[property]);});
	
	let rlpEncoded = rlp.encode(preEncodeSeq);
	let hash = blake2b256(rlpEncoded);

	let signature = toBuffer(nacl.sign.detached(hash,toBuffer(account.privateKey)));
	// ?need? verity nacl signature check aion_web3.web3-eth-accounts line 229 - 231
	let aionPubSig = Buffer.concat([toBuffer(account.publicKey),signature],aionPubSigLen);
	let rawTx = rlp.decode(rlpEncoded).concat(aionPubSig);
	let rawTransaction = rlp.encode(rawTx);
	
	result.raw = {
		messageHash:bufferToZeroXHex(hash),
		signature:bufferToZeroXHex(aionPubSig),
		rawTransaction:bufferToZeroXHex(rawTransaction)
	};
	//console.log("getRawTx:"+JSON.stringify(result));
	return result.raw;
}

module.exports = {
	to_aion: to_aion,
	prefix_remove: prefix_remove,
	prefix_prepend: prefix_prepend  
}