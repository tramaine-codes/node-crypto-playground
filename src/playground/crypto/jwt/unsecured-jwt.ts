import * as jose from 'jose';

const unsecuredJwt = new jose.UnsecuredJWT({ 'urn:example:claim': true })
  .setIssuedAt()
  .setIssuer('urn:example:issuer')
  .setAudience('urn:example:audience')
  .setExpirationTime('1h')
  .encode();

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(unsecuredJwt);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(jose.decodeJwt(unsecuredJwt));
