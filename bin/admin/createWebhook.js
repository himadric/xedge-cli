#!/usr/bin/env node

const chalk = require("chalk");
const yargs = require("yargs");
const envHelpers = require("../helpers/envHelpers");
const axios = require("axios");
const fs = require('fs');
const path = require('path');

const options = yargs
 .usage("Usage: create-webhook -f <json request file>")
 .option("file", { alias: "f", describe: "json file path", type: "string", demandOption: true })
 .showHelpOnFail(false, "oops, something went wrong! run with --help.")
 .example("create-webhook -f c:\webhooks\webhook-request.json")
 .argv;

const rawdata = fs.readFileSync(path.resolve(__dirname, options.file));
const webhookRequest = JSON.parse(rawdata);
 
const token = envHelpers.getToken();
const adminUrl = envHelpers.getAdminUrl();
const config = {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}

axios.post(`${adminUrl}/webhooks`, webhookRequest, config)
.then((result) => {
    console.log(chalk.green.bold(`Successfully created webhook. Status ${result.status}.`));
    console.log(result.data);
  })
  .catch((err) => {
    console.log(chalk.red.bold(err.message));
    throw new Error(err);
  })