#!/usr/bin/env node

const chalk = require("chalk");
const yargs = require("yargs");
const envHelpers = require("../helpers/envHelpers");
const axios = require("axios");

const options = yargs
 .usage("Usage: get-settings")
 .showHelpOnFail(false, "oops, something went wrong! run with --help.")
 .example("get-settings")
 .argv;

const token = envHelpers.getToken();
const adminUrl = envHelpers.getAdminUrl();
const config = {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}

axios.get(`${adminUrl}/settings`, config)
.then((result) => {
    console.log(result.data);
  })
  .catch((err) => {
    console.log(chalk.red.bold(err.message));
    throw new Error(err);
  })