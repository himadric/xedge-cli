#!/usr/bin/env node

const chalk = require("chalk");
const yargs = require("yargs");
const envHelpers = require("../helpers/envHelpers");
const axios = require("axios");

const options = yargs
 .usage("Usage: xedge-delete-cache --id <Collection Id>")
 .option("col_id", { alias: "id", describe: "Collection Id", type: "string", demandOption: false })
 .showHelpOnFail(false, "oops, something went wrong! run with --help.")
 .example("xedge-delete-cache --id 728ybIDJ7kK2XxYKLe5DqA")
 .argv;

const token = envHelpers.getToken();
const adminUrl = envHelpers.getAdminUrl();
const config = {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}

axios.delete(`${adminUrl}/cache/${options.col_id}`, config)
.then((result) => {
    console.log(chalk.green.bold(`Removed cache successfully. Status ${result.status}.`));
  })
  .catch((err) => {
    console.log(chalk.red.bold(err.message));
    throw new Error(err);
  })