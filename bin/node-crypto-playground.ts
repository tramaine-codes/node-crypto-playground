#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'dotenv/config';
import 'source-map-support/register';
import { NodeCryptoPlaygroundStack } from '../src/cdk/node-crypto-playground-stack.js';
import { Config } from '../src/playground/infrastructure/config/config.js';

const app = new cdk.App();
const config = new Config();

new NodeCryptoPlaygroundStack(app, 'NodeCryptoPlaygroundStack', config, {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
