/* eslint-disable no-console */
import { generateKeyPairSync } from 'node:crypto';

const passphrase = 'top secret';
const { publicKey, privateKey } = generateKeyPairSync('ec', {
  namedCurve: 'secp521r1',
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase,
  },
});

console.log(publicKey);
console.log(privateKey);
