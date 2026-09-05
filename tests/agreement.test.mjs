import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import solc from 'solc';
import ganache from 'ganache';
import { createPublicClient, createWalletClient, custom, zeroAddress, decodeEventLog } from 'viem';

const digest = value => '0x' + createHash('sha256').update(value).digest('hex');

test('真实合约：注册、签署权限、撤销终态、事件与不可变文件指纹', async()=>{
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
 const gas=await p.estimateGas({account:accounts[0],data:'0x'+evm.bytecode.object});
 const hash=await w.deployContract({account:accounts[0],abi,bytecode:'0x'+evm.bytecode.object,chain:null,gas});
 const receipt=await p.waitForTransactionReceipt({hash});assert.equal(receipt.status,'success');const address=receipt.contractAddress;
 assert.ok((await p.getCode({address})).length>2);
 const write=async(account,functionName,args=[])=>{const {request}=await p.simulateContract({address,abi,account,functionName,args});const gas=await p.estimateContractGas({address,abi,account,functionName,args});const h=await w.writeContract({...request,chain:null,gas});const receipt=await p.waitForTransactionReceipt({hash:h});assert.equal(receipt.status,'success');return receipt;};
 const reject=async(account,functionName,args=[])=>assert.rejects(()=>p.simulateContract({address,abi,account,functionName,args}));
 const bid=digest('标书一');const contract=digest('金额一万元');
 const read=id=>p.readContract({address,abi,functionName:'agreements',args:[id]});
 const event=receipt=>decodeEventLog({abi,data:receipt.logs[0].data,topics:receipt.logs[0].topics});
 await reject(accounts[0],'createAgreement',[bid,contract,accounts[1]]);
 assert.equal(event(await write(accounts[0],'register')).eventName,'Registered');
 await reject(accounts[0],'register');
 await reject(accounts[0],'createAgreement',[bid,contract,accounts[0]]);
 await reject(accounts[0],'createAgreement',[bid,contract,zeroAddress]);
 await reject(accounts[0],'createAgreement',['0x'+'0'.repeat(64),contract,accounts[1]]);
 await reject(accounts[0],'createAgreement',[bid,'0x'+'0'.repeat(64),accounts[1]]);
 const created=event(await write(accounts[0],'createAgreement',[bid,contract,accounts[1]]));
 assert.equal(created.eventName,'AgreementCreated');assert.equal(created.args.id,1n);
 await reject(accounts[1],'signAgreement',[1n,bid,contract]);
 await write(accounts[1],'register');
 await write(accounts[2],'register');
 let a=await p.readContract({address,abi,functionName:'agreements',args:[1n]});
 assert.equal(a[0].toLowerCase(),accounts[0]);assert.equal(a[1].toLowerCase(),accounts[1]);assert.equal(a[2],bid);assert.equal(a[3],contract);assert.equal(a[5],1);assert.equal(a[6],0n);assert.ok(a[4]>0n);
 const original=a.slice(0,5);
 await reject(accounts[2],'signAgreement',[1n,bid,contract]);
 await reject(accounts[0],'signAgreement',[1n,bid,contract]);
 await reject(accounts[1],'signAgreement',[1n,bid,digest('篡改')]);
 await reject(accounts[1],'signAgreement',[999n,bid,contract]);
 await reject(accounts[1],'signAgreement',[1n,digest('篡改'),contract]);
 await reject(accounts[1],'signAgreement',[1n,contract,bid]);
 const signed=event(await write(accounts[1],'signAgreement',[1n,bid,contract]));
 assert.equal(signed.eventName,'AgreementSigned');assert.equal(signed.args.id,1n);
 await reject(accounts[1],'signAgreement',[1n,bid,contract]);
 a=await p.readContract({address,abi,functionName:'agreements',args:[1n]});assert.equal(a[5],2);assert.ok(a[6]>=a[4]);assert.deepEqual(a.slice(0,5),original);assert.equal(a[2],bid);assert.equal(a[3],contract);
 await reject(accounts[0],'cancelAgreement',[1n]);
 const finalSigned=await read(1n);
 await reject(accounts[0],'cancelAgreement',[999n]);
 await reject(accounts[1],'signAgreement',[0n,bid,contract]);
 await write(accounts[0],'createAgreement',[bid,contract,accounts[1]]);
 const pending=await read(2n);
 await reject(accounts[1],'cancelAgreement',[2n]);
 await reject(accounts[2],'cancelAgreement',[2n]);
 const cancelled=event(await write(accounts[0],'cancelAgreement',[2n]));
 assert.equal(cancelled.eventName,'AgreementCancelled');assert.equal(cancelled.args.id,2n);
 await reject(accounts[1],'signAgreement',[2n,bid,contract]);
 await reject(accounts[0],'cancelAgreement',[2n]);
 const finalCancelled=await read(2n);
 assert.equal(finalCancelled[5],3);assert.equal(finalCancelled[6],0n);
 assert.deepEqual(finalCancelled.slice(0,5),pending.slice(0,5));
 assert.deepEqual(await read(1n),finalSigned);
 assert.equal((await read(999n))[5],0);
 assert.equal(await p.readContract({address,abi,functionName:'agreementCount'}),2n);
 // Submit both conflicting operations directly, bypassing frontend simulation.
 for(const first of ['signAgreement','cancelAgreement']){
   await write(accounts[0],'createAgreement',[bid,contract,accounts[1]]);
   const id=await p.readContract({address,abi,functionName:'agreementCount'});
   const second=first==='signAgreement'?'cancelAgreement':'signAgreement';
   const receipts=[];
   for(const method of [first,second]){
     const hash=await w.writeContract({address,abi,functionName:method,
       args:method==='signAgreement'?[id,bid,contract]:[id],
       account:method==='signAgreement'?accounts[1]:accounts[0],chain:null,gas:300000n});
     receipts.push(await p.waitForTransactionReceipt({hash}));
   }
   assert.deepEqual(receipts.map(r=>r.status),['success','reverted']);
   assert.equal((await read(id))[5],first==='signAgreement'?2:3);
 }

 }finally{await provider.disconnect();}
});
