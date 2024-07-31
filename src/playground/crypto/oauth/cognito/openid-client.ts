import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { Effect } from 'effect';
import * as jose from 'jose';
import { Issuer } from 'openid-client';
import { CognitoGateway } from '../../../infrastructure/cognito/cognito-gateway.js';
import { env } from '../../../infrastructure/env/env.js';

const cognitoGateway = CognitoGateway.build();
const { clientId, clientSecret, userPoolId } = await Effect.runPromise(
  cognitoGateway.credentials()
);

const issuer = `https://${env.COGNITO_ISSUER_HOSTNAME}/${userPoolId}`;

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
  userPoolId,
});
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(
  await verifier.verify(accessToken, {
    clientId: claims.client_id,
    tokenUse: 'access',
  })
);
