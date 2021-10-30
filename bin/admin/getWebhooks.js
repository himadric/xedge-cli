#!/usr/bin/env node

const chalk = require("chalk");
const yargs = require("yargs");
const envHelpers = require("../helpers/envHelpers");
const axios = require("axios");

const options = yargs
 .usage("Usage: xedge-get-webhooks --id <Webhook Id>")
 .option("webhook_id", { alias: "id", describe: "Webhook Id", type: "string", demandOption: false })
 .showHelpOnFail(false, "oops, something went wrong! run with --help.")
 .example("xedge-get-webhooks --id ac54309f-61ec-4f92-adc7-bfedbb4bea7f")
 .argv;

const token = envHelpers.getToken();
const adminUrl = envHelpers.getAdminUrl();
const config = {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}

axios.get(`${adminUrl}/webhooks`, config)
.then((result) => {
    if(result.data.length === 0) {
      console.log("No webhooks found.");
    } else {
      console.log(result.data);
    }
  })
  .catch((err) => {
    console.log(chalk.red.bold(err.message));
    throw new Error(err);
  })