#!/usr/bin/env node

const chalk = require("chalk");
const yargs = require("yargs");
const envHelpers = require("../helpers/envHelpers");
const axios = require("axios");

const options = yargs
 .usage("Usage: get-api-keys")
 .showHelpOnFail(false, "oops, something went wrong! run with --help.")
 .example("get-api-keys")
 .argv;

const token = envHelpers.getToken();
const keyUrl = envHelpers.getKeyUrl()
const config = {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}

axios.get(`${keyUrl}`, config)
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