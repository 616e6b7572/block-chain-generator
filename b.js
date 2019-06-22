
console.log(a);

class Blockchain{
	constructor() {
		this.chain = [];
	}
	getHash(data){
		const hash = crypto.createHash('sha256');
		hash.update(data);
		return hash.digest('hex');
	}
	hasGenesis(){
		if(this.chain.length < 1){
			return 0;
		}
		else if(this.chain[0].prevHash == 0){
			return 1;
		}
		else{
			return -1;
		}
	}
	createGenesisBlock() {
		var block = {};
		block['index'] = 0;
		block['timestamp'] = Date.now();
		block['data'] = 'Genesis';
		block['prev'] = 0;
		block['link'] = this.getHash(block['index']+block['timestamp']+block['data']+block['prev']);
		this.chain.push(block);
		return 1;
	}
	createBlock(data) {
		var genesis = this.hasGenesis();
		if(genesis == 0){
			genesis = this.createGenesisBlock();
		}
		if(genesis == 1){
			var prev = this.chain[this.chain.length-1];
			var block = {};
			block['index'] = prev.index+1;
			block['timestamp'] = Date.now();
			block['data'] = data;
			block['prev'] = prev.link;
			block['link'] = this.getHash(block['index']+block['timestamp']+block['data']+block['prev']);
			this.chain.push(block);
			return 1;
		}
		else{
			return genesis;
		}
	}
	getChain(){
		return this.chain;
	}
}


var b = new Blockchain();
b.createBlock('hello');
console.log(b.getChain());

