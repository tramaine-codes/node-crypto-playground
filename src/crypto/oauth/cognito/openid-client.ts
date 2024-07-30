import { CognitoJwtVerifier } from 'aws-jwt-verify';
import * as jose from 'jose';
import { Issuer } from 'openid-client';
import { env } from '../../../infrastructure/env.js';

const clientId = env.COGNITO_CLIENT_ID;
const clientSecret = env.COGNITO_CLIENT_SECRET;
const issuer = env.COGNITO_ISSUER;
const poolId = env.COGNITO_POOL_ID;

const issuerService = await Issuer.discover(issuer);
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(issuerService.metadata);

const client = new issuerService.Client({
  client_id: clientId,
  client_secret: clientSecret,
});

const grantResponse = await client.grant({
  grant_type: 'client_credentials',
});
// biome-ignore lint/style/noNonNullAssertion: <explanation>
const accessToken = grantResponse.access_token!;
const claims = jose.decodeJwt<{ client_id: string }>(accessToken);

const verifier = CognitoJwtVerifier.create({
  userPoolId: poolId,
});
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(
  await verifier.verify(accessToken, {
    clientId: claims.client_id,
    tokenUse: 'access',
  })
);
