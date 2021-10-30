#!/usr/bin/env node

const chalk = require("chalk");
const yargs = require("yargs");
const envHelpers = require("../helpers/envHelpers");
const axios = require("axios");

const options = yargs
 .usage("Usage: get-api-key-by-token -t <token value>")
 .option("token", { alias: "t", describe: "token value of the api key", type: "string", demandOption: true })
 .showHelpOnFail(false, "oops, something went wrong! run with --help.")
 .example("get-api-key-by-token -t M1BQRFFpSWw5L1RYTWVTM0phR28rRkt2dWM0NytuT3pVSG4zUHB0cnBDZz18Z342M1BQRFFpSWw5L1RYTWVTM0phR28rRkt2dWM0NytuT3pVSG4zUHB0cnBDZz18Z342>ZXJpZW5jZWVkZ2VkZW1vMQ==")
 .argv;

const token = envHelpers.getToken();
const keyUrl = envHelpers.getKeyUrl()
const config = {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}

axios.get(`${keyUrl}/${options.token}`, config)
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