/* eslint-disable no-console */
import * as jose from 'jose';

const unsecuredJwt = new jose.UnsecuredJWT({ 'urn:example:claim': true })
  .setIssuedAt()
  .setIssuer('urn:example:issuer')
  .setAudience('urn:example:audience')
  .setExpirationTime('1h')
  .encode();

console.log(unsecuredJwt);
console.log(jose.decodeJwt(unsecuredJwt));
