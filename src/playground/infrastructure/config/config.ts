import { env } from './env/env.js';

interface Settings {
  readonly auth0: Auth0Settings;
  readonly cognito: CognitoSettings;
}

interface Auth0Settings {
  readonly audience: string;
  readonly clientId: string;
  readonly clientSecret: string;
  readonly domain: string;
  readonly issuer: string;
  readonly jwksUri: string;
}

interface CognitoSettings {
  readonly domainPrefix: string;
  readonly issuerHostname: string;
  readonly resourceServerIdentifier: string;
  readonly userPoolClientName: string;
  readonly userPoolName: string;
}

export class Config {
  readonly settings: Settings;

  constructor() {
    this.settings = {
      auth0: {
        audience: env.AUTH0_AUDIENCE,
        clientId: env.AUTH0_CLIENT_ID,
        clientSecret: env.AUTH0_CLIENT_SECRET,
        domain: env.AUTH0_DOMAIN,
        issuer: env.AUTH0_ISSUER,
        jwksUri: env.AUTH0_JWKS,
      },
      cognito: {
        domainPrefix: env.COGNITO_DOMAIN_PREFIX,
        issuerHostname: env.COGNITO_ISSUER_HOSTNAME,
        resourceServerIdentifier: env.COGNITO_RESOURCE_SERVER_IDENTIFIER,
        userPoolClientName: env.COGNITO_USER_POOL_CLIENT_NAME,
        userPoolName: env.COGNITO_USER_POOL_NAME,
      },
    };
  }
}
