import { Effect } from 'effect';
import { NoSuchElementException } from 'effect/Cause';
import { CognitoClient } from '../../vendor/cognito-client.js';
import { env } from '../env/env.js';

export class CognitoGateway {
  private readonly userPoolName = env.COGNITO_USER_POOL_NAME;
  private readonly clientName = env.COGNITO_USER_POOL_CLIENT_NAME;

  constructor(private readonly client: CognitoClient) {}

  credentials() {
    return Effect.Do.pipe(
      Effect.bind('userPool', () => this.client.userPool(this.userPoolName)),
      Effect.bind('userPoolId', ({ userPool: { Id } }) =>
        Effect.fromNullable(Id)
      ),
      Effect.catchTag(
        'NoSuchElementException',
        () =>
          new NoSuchElementException(
            `user pool id for ${this.userPoolName} not found`
          )
      ),
      Effect.bind('userPoolClient', ({ userPoolId }) =>
        this.client.userPoolClient(userPoolId, this.clientName)
      ),
      Effect.bind('clientId', ({ userPoolClient: { ClientId } }) =>
        Effect.fromNullable(ClientId)
      ),
      Effect.catchTag(
        'NoSuchElementException',
        () =>
          new NoSuchElementException(
            `client id for ${this.clientName} not found`
          )
      ),
      Effect.bind('userPoolClientDetails', ({ clientId, userPoolId }) =>
        this.client.describePoolClient(clientId, userPoolId)
      ),
      Effect.bind(
        'clientSecret',
        ({ userPoolClientDetails: { ClientSecret } }) =>
          Effect.fromNullable(ClientSecret)
      ),
      Effect.catchTag(
        'NoSuchElementException',
        () =>
          new NoSuchElementException(
            `client secret for ${this.clientName} not found`
          )
      ),
      Effect.andThen(({ clientId, clientSecret, userPoolId }) => ({
        clientId,
        clientSecret,
        userPoolId,
      }))
    );
  }

  static build() {
    return new CognitoGateway(CognitoClient.build());
  }
}
