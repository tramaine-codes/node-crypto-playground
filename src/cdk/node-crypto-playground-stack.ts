import * as cdk from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import type { Construct } from 'constructs';
import { Config } from '../playground/infrastructure/config/config.js';

const {
  settings: {
    cognito: {
      domainPrefix,
      resourceServerIdentifier,
      userPoolClientName,
      userPoolName,
    },
  },
} = new Config();

export class NodeCryptoPlaygroundStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userPool = new cognito.UserPool(this, 'UserPool', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      userPoolName,
    });

    const readScope = new cognito.ResourceServerScope({
      scopeName: 'nodecryptoplayground.read',
      scopeDescription: 'Node Crypto Playground API read scope',
    });
    const writeScope = new cognito.ResourceServerScope({
      scopeName: 'nodecryptoplayground.write',
      scopeDescription: 'Node Crypto Playground API write scope',
    });
    const resourceServer = new cognito.UserPoolResourceServer(
      this,
      'ResourceServer',
      {
        identifier: resourceServerIdentifier,
        userPool,
        scopes: [readScope, writeScope],
      }
    );

    new cognito.UserPoolDomain(this, 'UserPoolDomain', {
      userPool,
      cognitoDomain: {
        domainPrefix,
      },
    });

    new cognito.UserPoolClient(this, 'UserPoolClient', {
      accessTokenValidity: cdk.Duration.hours(1),
      enableTokenRevocation: true,
      generateSecret: true,
      oAuth: {
        flows: {
          clientCredentials: true,
        },
        scopes: [
          cognito.OAuthScope.resourceServer(resourceServer, readScope),
          cognito.OAuthScope.resourceServer(resourceServer, writeScope),
        ],
      },
      refreshTokenValidity: cdk.Duration.days(1),
      userPool,
      userPoolClientName,
    });
  }
}
