import { JwtRsaVerifier } from 'aws-jwt-verify';
import * as jose from 'jose';
import * as oauth from 'oauth4webapi';
import { Config } from '../../../infrastructure/config/config.js';

const {
  settings: {
    auth0: { audience, clientId, clientSecret, issuer, jwksUri },
  },
} = new Config();
const issuerUrl = new URL(issuer);

const client = {
  client_id: clientId,
} satisfies oauth.Client;
const clientAuth = oauth.ClientSecretPost(clientSecret);

const jwks = jose.createRemoteJWKSet(new URL(jwksUri));
const as = await oauth.processDiscoveryResponse(
  issuerUrl,
  await oauth.discoveryRequest(issuerUrl)
);

const grantResponse = await oauth.clientCredentialsGrantRequest(
  as,
  client,
  clientAuth,
  {
    audience,
    grant_type: 'client_credentials',
  }
);

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
