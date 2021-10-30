#!/usr/bin/env node

const chalk = require("chalk");
const yargs = require("yargs");
const envHelpers = require("../helpers/envHelpers");
const axios = require("axios");

const options = yargs
 .usage("Usage: rename-api-key-by-token -t <token>")
 .option("token", { alias: "t", describe: "X-GQL-Token value for the Api Key", type: "string", demandOption: true })
 .option("newName", { alias: "n", describe: "New name for the Api Key", type: "string", demandOption: true })
 .showHelpOnFail(false, "oops, something went wrong! run with --help.")
 .example("rename-api-key-by-token -t M1BQRFFpSWw5L1RYAB1234phR28rRkt2dWM0NytuT3pVSG4zUHB0cnBDZz18ZXhwZXJpZW5jZWVkZ2VkZW1vMQ== -n newName")
 .argv;
 
const token = envHelpers.getToken();
const keyUrl = envHelpers.getKeyUrl();
const config = {
  headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
  }
}
const body = `{"newName": "${options.newName}"}`
axios.put(`${keyUrl}/renamebytoken/${options.token}`, body, config)
.then((result) => {
    console.log(chalk.green.bold(`Successfully renamed Api Key. Status ${result.status}.`));
    console.log(result.data);
  })
  .catch((err) => {
    console.log(chalk.red.bold(err.message));
    throw new Error(err);
  })