import 'dotenv/config';
import { cleanEnv, host, str, url } from 'envalid';

export const env = cleanEnv(process.env, {
  AUTH0_AUDIENCE: url(),
  AUTH0_CLIENT_ID: str(),
  AUTH0_CLIENT_SECRET: str(),
  AUTH0_DOMAIN: host(),
  AUTH0_ISSUER: url(),
  AUTH0_JWKS: url(),
});
