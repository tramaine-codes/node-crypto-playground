import { AuthenticationClient } from 'auth0';
import { JwtRsaVerifier } from 'aws-jwt-verify';
import * as jose from 'jose';
import { env } from '../../infrastructure/env.js';

const audience = env.AUTH0_AUDIENCE;
const issuer = env.AUTH0_ISSUER;
const jwksUri = env.AUTH0_JWKS;

const authenticationClient = new AuthenticationClient({
  clientId: env.AUTH0_CLIENT_ID,
  clientSecret: env.AUTH0_CLIENT_SECRET,
  domain: env.AUTH0_DOMAIN,
});
const jwks = jose.createRemoteJWKSet(new URL(jwksUri));

const response = await authenticationClient.oauth.clientCredentialsGrant({
  audience,
});
const accessToken = response.data.access_token;

const { payload } = await jose.jwtVerify(accessToken, jwks, {
  issuer,
  audience,
});
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(payload);

const verifier = JwtRsaVerifier.create({
  audience,
  issuer,
  jwksUri,
});
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(await verifier.verify(accessToken));
