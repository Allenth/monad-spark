import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import solc from 'solc';
import ganache from 'ganache';
import { createPublicClient, createWalletClient, custom, zeroAddress, keccak256, toHex } from 'viem';

test('签署权限、账号注册、版本不变与重复签署', async()=>{
 assert.ok(fs.existsSync('contracts/DocumentAgreement.sol'),'签署合约尚未实现');
 const source=fs.readFileSync('contracts/DocumentAgreement.sol','utf8');
 const out=JSON.parse(solc.compile(JSON.stringify({language:'Solidity',sources:{'DocumentAgreement.sol':{content:source}},settings:{evmVersion:'shanghai',optimizer:{enabled:true,runs:200},outputSelection:{'*':{'*':['abi','evm.bytecode.object']}}}})));
 const errors=(out.errors||[]).filter(x=>x.severity==='error');assert.deepEqual(errors,[]);
 const {abi,evm}=out.contracts['DocumentAgreement.sol'].DocumentAgreement;
 const provider=ganache.provider({logging:{quiet:true},chain:{hardfork:'shanghai'}});
 try{
 const p=createPublicClient({transport:custom(provider)});
 const accounts=await provider.request({method:'eth_accounts',params:[]});
 const w=createWalletClient({transport:custom(provider)});
 const hash=await w.deployContract({account:accounts[0],abi,bytecode:'0x'+evm.bytecode.object,chain:null});
 const receipt=await p.waitForTransactionReceipt({hash});const address=receipt.contractAddress;
 const write=async(account,functionName,args=[])=>{const {request}=await p.simulateContract({address,abi,account,functionName,args});const h=await w.writeContract({...request,chain:null});assert.equal((await p.waitForTransactionReceipt({hash:h})).status,'success');};
 const reject=async(account,functionName,args=[])=>assert.rejects(()=>p.simulateContract({address,abi,account,functionName,args}));
 const bid=keccak256(toHex('标书一'));const contract=keccak256(toHex('金额一万元'));
 await reject(accounts[0],'createAgreement',[bid,contract,accounts[1]]);
 await write(accounts[0],'register');await write(accounts[1],'register');
 await reject(accounts[0],'register');
 await reject(accounts[0],'createAgreement',[bid,contract,accounts[0]]);
 await reject(accounts[0],'createAgreement',[bid,contract,zeroAddress]);
 await reject(accounts[0],'createAgreement',['0x'+'0'.repeat(64),contract,accounts[1]]);
 await write(accounts[0],'createAgreement',[bid,contract,accounts[1]]);
 let a=await p.readContract({address,abi,functionName:'agreements',args:[1n]});
 assert.equal(a[0].toLowerCase(),accounts[0]);assert.equal(a[1].toLowerCase(),accounts[1]);assert.equal(a[2],bid);assert.equal(a[3],contract);assert.equal(a[5],false);
 await reject(accounts[2],'signAgreement',[1n,bid,contract]);
 await reject(accounts[0],'signAgreement',[1n,bid,contract]);
 await reject(accounts[1],'signAgreement',[1n,bid,keccak256(toHex('篡改'))]);
 await reject(accounts[1],'signAgreement',[999n,bid,contract]);
 await write(accounts[1],'signAgreement',[1n,bid,contract]);
 await reject(accounts[1],'signAgreement',[1n,bid,contract]);
 a=await p.readContract({address,abi,functionName:'agreements',args:[1n]});assert.equal(a[5],true);assert.equal(a[2],bid);assert.equal(a[3],contract);
 assert.equal(await p.readContract({address,abi,functionName:'agreementCount'}),1n);
 }finally{await provider.disconnect();}
});
