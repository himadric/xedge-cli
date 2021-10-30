#!/usr/bin/env node

const chalk = require("chalk");
const yargs = require("yargs");
const envHelpers = require("../helpers/envHelpers");
const axios = require("axios");
const options = yargs
 .usage("Usage: xedge-revoke-api-key-by-hash -h <hash>")
 .option("hash", { alias: "h", describe: "Hash value for the Api Key", type: "string", demandOption: true })
 .showHelpOnFail(false, "oops, something went wrong! run with --help.")
 .example("xedge-revoke-api-key-by-hash -h cec0b2ebdce8e383f4ef0144c7c153ea2d3332c92ccd855ce5bce2b178edfaf9")
 .argv;
 
const token = envHelpers.getToken();
const keyUrl = envHelpers.getKeyUrl();
const config = {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}

axios.put(`${keyUrl}/revokebyhash/${options.hash}`, {}, config)
.then((result) => {
    console.log(chalk.green.bold(`Successfully revoked Api Key. Status ${result.status}.`));
    console.log(result.data);
  })
  .catch((err) => {
    console.log(chalk.red.bold(err.message));
    throw new Error(err);
  })