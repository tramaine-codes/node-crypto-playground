/* eslint-disable no-console */
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

const data = 'foo';
const key = randomBytes(32);
const iv = randomBytes(16);
const cipher = createCipheriv('aes-256-gcm', key, iv);
const decipher = createDecipheriv('aes-256-gcm', key, iv);
const cipherText = cipher.update(data, 'utf-8', 'base64');
const plainText = decipher
  .update(Buffer.from(cipherText, 'base64'))
  .toString('utf-8');

console.log(key.toString('base64'));
console.log(iv.toString('base64'));
console.log(cipherText);
console.log(plainText);
