#!/usr/bin/env node

const chalk = require("chalk");
const yargs = require("yargs");
const envHelpers = require("../helpers/envHelpers");
const axios = require("axios");

const options = yargs
 .usage("Usage: update-settings --contentCacheAutoClear <true or false> --mediaCacheAutoClear <true or false> --tenantCacheAutoClear <true or false> --contentCacheTtl <duration> --mediaCacheTtl <duration>")
 .option("contentCacheAutoClear", { alias: "contentCacheAutoClear", describe: "contentCacheAutoClear value", type: "boolean", demandOption: false })
 .option("mediaCacheAutoClear", { alias: "mediaCacheAutoClear", describe: "mediaCacheAutoClear value", type: "boolean", demandOption: false })
 .option("tenantCacheAutoClear", { alias: "tenantCacheAutoClear", describe: "tenantCacheAutoClear value", type: "boolean", demandOption: false })
 .option("contentCacheTtl", { alias: "contentCacheTtl", describe: "contentCacheTtl value", type: "string", demandOption: false })
 .option("mediaCacheTtl", { alias: "mediaCacheTtl", describe: "mediaCacheTtl value", type: "string", demandOption: false })
 .showHelpOnFail(false, "oops, something went wrong! run with --help.")
 .example("update-settings --contentCacheAutoClear true --mediaCacheAutoClear true --tenantCacheAutoClear  true --contentCacheTtl 04:00:00 --mediaCacheTtl 04:00:00")
 .argv;

const body = [];
if(options.contentcacheautoclear!==undefined) {
  body.push(
  {
    "op":"replace",
    "path":"/contentcacheautoclear",
    "value":options.contentcacheautoclear
  });
}
if(options.mediaCacheAutoClear!==undefined) {
  body.push(
  {
    "op":"replace",
    "path":"/mediaCacheAutoClear",
    "value":options.mediaCacheAutoClear
  });
}
if(options.tenantCacheAutoClear!==undefined) {
  body.push(
  {
    "op":"replace",
    "path":"/tenantCacheAutoClear",
    "value":options.tenantCacheAutoClear
  });
}
if(options.contentCacheTtl!==undefined) {
  body.push(
  {
    "op":"replace",
    "path":"/contentCacheTtl",
    "value":options.contentCacheTtl
  });
}
if(options.mediaCacheTtl!==undefined) {
  body.push(
  {
    "op":"replace",
    "path":"/mediaCacheTtl",
    "value":options.mediaCacheTtl
  });
}

const token = envHelpers.getToken();
const adminUrl = envHelpers.getAdminUrl();
const config = {
    headers: {
        'Content-Type': 'application/json-patch+json',
        'Authorization': `Bearer ${token}`
    }
}

axios.patch(`${adminUrl}/settings`, body, config)
.then((result) => {
    console.log(`Updated settings successfully. Current settings ${JSON.stringify(result.data)}. Status ${result.status}.`);
  })
  .catch((err) => {
    console.log(chalk.red.bold(err.message));
    throw new Error(err);
  })