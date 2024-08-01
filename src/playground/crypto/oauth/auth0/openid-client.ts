import { Issuer } from 'openid-client';
import { Config } from '../../../infrastructure/config/config.js';

const {
  settings: {
    auth0: { issuer },
  },
} = new Config();

const issuerService = await Issuer.discover(issuer);
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(issuerService.metadata);
