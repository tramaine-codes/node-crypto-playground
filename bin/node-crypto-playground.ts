#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'dotenv/config';
import 'source-map-support/register';
import { NodeCryptoPlaygroundStack } from '../src/cdk/node-crypto-playground-stack.js';

new NodeCryptoPlaygroundStack(new cdk.App(), 'NodeCryptoPlaygroundStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
