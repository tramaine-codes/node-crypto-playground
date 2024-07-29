import { generateKeyPairSync } from 'node:crypto';

const passphrase = 'top secret';
const { publicKey, privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 4096,
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

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(publicKey);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(privateKey);
