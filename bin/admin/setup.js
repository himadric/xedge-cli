#!/usr/bin/env node

const yargs = require("yargs");
const netrc = require("../netrc/netrc");
const chalk = require("chalk");
const envHelpers = require("../helpers/envHelpers");

const options = yargs
    .usage("Usage: setup-env --tkn_url <Token URL> --aud_url <Audience Url> --adm_url <Admin URL> --key_url <Preview URL>")
    .option("token_url", { alias: "tkn_url", describe: "Provide the URL that should be used for acquiring JWT token. Example: https://one-sc-beta.eu.auth0.com/oauth/token", type: "string", demandOption: true })
    .option("audience_url", { alias: "aud_url", describe: "Provide the audience url. Example: https://delivery.sitecore-beta.cloud/tenant_id. Tenant Id can be found in Content Hub license.", type: "string", demandOption: true })
    .option("admin_url", { alias: "adm_url", describe: "Provide the admin url. Example: https://edge-beta.sitecorecloud.io/api/admin/v1", type: "string", demandOption: true })
    .option("key_url", { alias: "key_url", describe: "Provide the url to manage keys in the delivery system. Example: https://edge-beta.sitecorecloud.io/api/apikey/v1", type: "string", demandOption: true })
    .showHelpOnFail(false, "oops, something went wrong! run with --help.")
    .example("setup-env --tkn_url https://one-sc-beta.eu.auth0.com/oauth/token --aud_url https://delivery.sitecore-beta.cloud/tenant_id --adm_url https://edge-beta.sitecorecloud.io/api/admin/v1 --key_url https://edge-beta.sitecorecloud.io/api/apikey/v1")
    .argv;

const hostName = envHelpers.hostName;

if(!netrc.hasHost(hostName))
{
    netrc.addHost(hostName).token_url = options.token_url;
    netrc.host(hostName).audience_url = options.audience_url;
    netrc.host(hostName).admin_url = options.admin_url;
    netrc.host(hostName).key_url = options.key_url;
    netrc.write();
}
else {
    netrc.host(hostName).token_url = options.token_url;
    netrc.host(hostName).admin_url = options.admin_url;
    netrc.host(hostName).audience_url = options.audience_url;
    netrc.host(hostName).key_url = options.key_url;
    netrc.write();
}

console.log(chalk.green.bold("Successfully added setup parameters!!"));
