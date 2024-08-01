# Node Crypto Playground

This project serves as a playground for experimenting with [Node.js](https://nodejs.org/) cryptographic libraries.

Some of the code examples require an [Auth0](https://auth0.com/) with an API connection that issues OAuth access tokens.

Some of the code examples require the creation of an [AWS Cognito](https://aws.amazon.com/cognito/) user pool that issues OAuth access tokens. The [AWS Cloud Development Kit (CDK)](https://aws.amazon.com/cdk/) is used to create all of the necessary AWS Cognito resources.

## Prerequisites

Ensure the following requirements are met prior to usage:

- Node.js 18 or higher
- An active Auth0 account
- An active [Amazon Web Services (AWS)](https://aws.amazon.com/) account

## Setup

1. Clone the repository:

```sh
git clone git@github.com:tgillus/node-crypto-playground.git
```

2. Install the project dependencies:

```sh
cd node-crypto-playground
npm install
```

3. Create a `.env` in the root of the project based on the `.env.example` file and add values for each of the environment variables:

```sh
cp .env.example .env
```

The environment variables have place holder values that need to be replaced with actual values.

**NOTE**: The `.env` file is used to store sensitive information such as OAuth client id and client secret values. Do not commit the `.env` file to source control.

## Commands

| Command              | Description                                               |
| -------------------- | --------------------------------------------------------- |
| `npm run build`      | Check for TypeScript errors.                              |
| `npm run watch`      | Watch for changes and check for TypeScript errors.        |
| `npm run test`       | Execute unit tests.                                       |
| `npm run cdk deploy` | Deploy a CDK stack to AWS.                                |
| `npm run cdk diff`   | Deploy a CDK stack to AWS.                                |
| `npm run cdk synth`  | Emit synethesize CloudFormation template for a CDK stack. |
| `npm run format`     | Format source files.                                      |
| `npm run lint`       | Run linter against source files.                          |
| `npm run lint:fix`   | Lint source files and fix issues disovered by the linter. |

## Command Examples

### Deploy AWS Cognito Resources

```sh
npm run cdk deploy -- --all
```

### Request and Validate an Auth0 Access Token

```sh
npx tsx src/playground/crypto/oauth/auth0/auth0.ts
```

### Request and Validate an AWS Cognito Access Token

```sh
npx tsx src/playground/crypto/oauth/cognito/openid-client.ts
```
