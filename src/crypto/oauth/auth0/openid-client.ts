import { Issuer } from 'openid-client';
import { env } from '../../../infrastructure/env.js';

const issuer = env.AUTH0_ISSUER;

const issuerService = await Issuer.discover(issuer);
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(issuerService.metadata);
