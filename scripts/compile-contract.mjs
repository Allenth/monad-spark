import fs from 'node:fs';
import solc from 'solc';
import { createHash } from 'node:crypto';

const source = fs.readFileSync(new URL('../contracts/DocumentAgreement.sol', import.meta.url), 'utf8');
const settings = {
  evmVersion: 'shanghai',
  optimizer: { enabled: true, runs: 200 },
  outputSelection: { '*': { '*': ['abi', 'evm.bytecode.object', 'evm.deployedBytecode.object'] } },
};
const output = JSON.parse(solc.compile(JSON.stringify({
  language: 'Solidity', sources: { 'DocumentAgreement.sol': { content: source } }, settings,
})));
const errors = (output.errors || []).filter(error => error.severity === 'error');
if (errors.length) throw new Error(errors.map(error => error.formattedMessage).join('\n'));
const { abi, evm } = output.contracts['DocumentAgreement.sol'].DocumentAgreement;
const artifact = {
  contractName: 'DocumentAgreement', compilerVersion: solc.version(), settings,
  sourceSha256: createHash('sha256').update(source).digest('hex'),
  abi, bytecode: '0x' + evm.bytecode.object, deployedBytecode: '0x' + evm.deployedBytecode.object,
};
fs.writeFileSync(new URL('../lib/agreement-artifact.json', import.meta.url), JSON.stringify(artifact, null, 2) + '\n');
console.log(`Compiled DocumentAgreement: ${artifact.compilerVersion}, EVM shanghai, optimizer 200`);
