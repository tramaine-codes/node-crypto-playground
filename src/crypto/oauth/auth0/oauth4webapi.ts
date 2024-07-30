import { JwtRsaVerifier } from 'aws-jwt-verify';
import * as jose from 'jose';
import * as oauth from 'oauth4webapi';
import { env } from '../../../infrastructure/env.js';

const audience = env.AUTH0_AUDIENCE;
const clientId = env.AUTH0_CLIENT_ID;
const clientSecret = env.AUTH0_CLIENT_SECRET;
const issuer = env.AUTH0_ISSUER;
const issuerUrl = new URL(env.AUTH0_ISSUER);
const jwksUri = env.AUTH0_JWKS;

const client = {
  client_id: clientId,
  client_secret: clientSecret,
  token_endpoint_auth_method: 'client_secret_post',
} satisfies oauth.Client;

const jwks = jose.createRemoteJWKSet(new URL(jwksUri));
const as = await oauth.processDiscoveryResponse(
  issuerUrl,
  await oauth.discoveryRequest(issuerUrl)
);

const grantResponse = await oauth.clientCredentialsGrantRequest(as, client, {
  audience,
  grant_type: 'client_credentials',
});

const response = await oauth.processClientCredentialsResponse(
  as,
  client,
  grantResponse
);
// biome-ignore lint/style/noNonNullAssertion: <explanation>
const accessToken = response.access_token!.toString();

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
