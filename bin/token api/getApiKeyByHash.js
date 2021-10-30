#!/usr/bin/env node

const chalk = require("chalk");
const yargs = require("yargs");
const envHelpers = require("../helpers/envHelpers");
const axios = require("axios");

const options = yargs
 .usage("Usage: xedge-get-api-key-by-hash -h <hash value>")
 .option("hash", { alias: "h", describe: "hash value of the api key", type: "string", demandOption: true })
 .showHelpOnFail(false, "oops, something went wrong! run with --help.")
 .example("xedge-get-api-key-by-hash -h d5cd2de0251b0266cac7793a2f1b6af8b2edb7e78affb286373e00dc4153d57a")
 .argv;

const token = envHelpers.getToken();
const keyUrl = envHelpers.getKeyUrl()
const config = {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}

axios.get(`${keyUrl}/${options.hash}`, config)
.then((result) => {
    if(result.data.length === 0) {
      console.log("No api keys found.");
    } else {
      console.log(JSON.stringify(result.data, null, 1));
    }
  })
  .catch((err) => {
    console.log(chalk.red.bold(err.message));
    throw new Error(err);
  })