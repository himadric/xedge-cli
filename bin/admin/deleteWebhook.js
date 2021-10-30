#!/usr/bin/env node

const chalk = require("chalk");
const yargs = require("yargs");
const envHelpers = require("../helpers/envHelpers");
const axios = require("axios");

const options = yargs
 .usage("Usage: delete-webhook --id <Webhook Id>")
 .option("webhook_id", { alias: "id", describe: "Webhook Id", type: "string", demandOption: true })
 .showHelpOnFail(false, "oops, something went wrong! run with --help.")
 .example("delete-webhooks --id ac54309f-61ec-4f92-adc7-bfedbb4bea7f")
 .argv;

const token = envHelpers.getToken();
const adminUrl = envHelpers.getAdminUrl();
const config = {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}

axios.delete(`${adminUrl}/webhooks/${options.webhook_id}`, config)
.then((result) => {
    console.log(chalk.green.bold(`Removed webhook successfully. Status ${result.status}.`));
  })
  .catch((err) => {
    console.log(chalk.red.bold(err.message));
    throw new Error(err);
  })