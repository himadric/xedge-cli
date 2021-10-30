#!/usr/bin/env node

const chalk = require("chalk");
const yargs = require("yargs");
const envHelpers = require("../helpers/envHelpers");
const axios = require("axios");

const options = yargs
 .usage("Usage: xedge-delete-content")
 .showHelpOnFail(false, "oops, something went wrong! run with --help.")
 .example("xedge-delete-content")
 .argv;

const token = envHelpers.getToken();
const adminUrl = envHelpers.getAdminUrl();
const config = {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}

axios.delete(`${adminUrl}/content`, config)
.then((result) => {
    console.log(chalk.green.bold(`Removed content successfully. Status ${result.status}.`));
  })
  .catch((err) => {
    console.log(chalk.red.bold(err.message));
    throw new Error(err);
  })