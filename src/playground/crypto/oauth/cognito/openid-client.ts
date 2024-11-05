import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { Effect } from 'effect';
import * as jose from 'jose';
import * as client from 'openid-client';
import { CognitoGateway } from '../../../infrastructure/cognito/cognito-gateway.js';
import { Config } from '../../../infrastructure/config/config.js';

const {
  settings: {
    cognito: { issuerHostname },
  },
} = new Config();

const cognitoGateway = CognitoGateway.build();
const { clientId, clientSecret, userPoolId } = await Effect.runPromise(
  cognitoGateway.credentials()
);

const issuer = `https://${issuerHostname}/${userPoolId}`;

const config = await client.discovery(new URL(issuer), clientId, clientSecret);
// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(config.serverMetadata());

const grantResponse = await client.clientCredentialsGrant(config);
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
