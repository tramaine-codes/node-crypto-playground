import * as client from 'openid-client';
import { Config } from '../../../infrastructure/config/config.js';

const {
  settings: {
    auth0: { clientId, clientSecret, issuer },
  },
} = new Config();

const issuerService = await client.discovery(
  new URL(issuer),
  clientId,
  clientSecret
);
console.log(issuerService.serverMetadata());
