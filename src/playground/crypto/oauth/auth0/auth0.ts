import { AuthenticationClient } from 'auth0';
import { JwtRsaVerifier } from 'aws-jwt-verify';
import * as jose from 'jose';
import { Config } from '../../../infrastructure/config/config.js';

const {
  settings: {
    auth0: { audience, clientId, clientSecret, domain, issuer, jwksUri },
  },
} = new Config();

const authenticationClient = new AuthenticationClient({
  clientId,
  clientSecret,
  domain,
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
console.log(payload);

const verifier = JwtRsaVerifier.create({
  audience,
  issuer,
  jwksUri,
});
console.log(await verifier.verify(accessToken));
