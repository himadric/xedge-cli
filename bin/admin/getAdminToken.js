#!/usr/bin/env node

const chalk = require("chalk");
const yargs = require("yargs");
const netrc = require("../netrc/netrc");
const envHelpers = require("../helpers/envHelpers");
const axios = require("axios");

const options = yargs
 .usage("Usage: get-admin-token -i <Client ID> -s <Client Secret>")
 .option("client_id", { alias: "i", describe: "Provide OAuth Client ID", type: "string", demandOption: true })
 .option("client_secret", { alias: "s", describe: "Provide OAuth Client Secret", type: "string", demandOption: true })
 .argv;

const token_url = envHelpers.getTokenUrl();
const audience = envHelpers.getAudienceUrl();

const params = new URLSearchParams()
params.append('grant_type', 'client_credentials')
params.append('client_id', `${options.client_id}`)
params.append('client_secret', `${options.client_secret}`)
params.append('audience', `${audience}`)

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

axios.post(`${token_url}`, params, config)
.then((result) => {
    netrc.host(envHelpers.hostName).token = result.data.access_token;
    netrc.write();
    console.log(chalk.green.bold(`Successfully saved access token. This access token will expire after ${result.data.expires_in} second.`));
    console.log(result.data.access_token);
  })
  .catch((err) => {
    console.log(chalk.red.bold(err.message));
    throw new Error(err);
  })

//read
//var token = netrc.host('xedge.auth0').token;
// console.log(pass);
// //edit
// netrc.host('surge.surge.sh').password = greeting;
// netrc.write();
// var pass = netrc.host('surge.surge.sh').password;

//add new
// netrc.addHost('xedge.auth0').token = greeting;
// netrc.write();
// token = netrc.host('xedge.auth0').token;