import { Issuer } from 'openid-client';

const issuer = await Issuer.discover(
  'https://dev-o0acfhfake3uhjed.us.auth0.com'
);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(issuer.metadata);
