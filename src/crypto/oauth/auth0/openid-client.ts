import { Issuer } from 'openid-client';
import { env } from '../../../infrastructure/env.js';

const issuer = await Issuer.discover(env.AUTH0_ISSUER);
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(issuer.metadata);
