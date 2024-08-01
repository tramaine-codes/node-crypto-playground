import { Effect } from 'effect';
import { NoSuchElementException } from 'effect/Cause';
import { CognitoClient } from '../../vendor/cognito-client.js';
import { Config } from '../config/config.js';

export class CognitoGateway {
  private readonly userPoolClientName;
  private readonly userPoolName;

  constructor(
    private readonly client: CognitoClient,
    {
      settings: {
        cognito: { userPoolClientName, userPoolName },
      },
    }: Config
  ) {
    this.userPoolClientName = userPoolClientName;
    this.userPoolName = userPoolName;
  }

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
        this.client.userPoolClient(userPoolId, this.userPoolClientName)
      ),
      Effect.bind('clientId', ({ userPoolClient: { ClientId } }) =>
        Effect.fromNullable(ClientId)
      ),
      Effect.catchTag(
        'NoSuchElementException',
        () =>
          new NoSuchElementException(
            `client id for ${this.userPoolClientName} not found`
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
            `client secret for ${this.userPoolClientName} not found`
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
    return new CognitoGateway(CognitoClient.build(), new Config());
  }
}
