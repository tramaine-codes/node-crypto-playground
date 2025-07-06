import { createSign, generateKeyPairSync, verify } from 'node:crypto';

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
const data = 'foo';
const sign = createSign('sha512');
const signed = sign
  .update(data)
  .sign({ key: privateKey, passphrase })
  .toString('base64');

console.log(signed);
console.log(
  verify('sha512', Buffer.from(data), publicKey, Buffer.from(signed, 'base64'))
);
