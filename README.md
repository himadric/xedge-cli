# Sitecore Experience Edge for Content Hub Cli
The Sitecore Experience Edge for Content Hub Cli is a command line interface for adminisitering Experience Edge from command prompt. To know more about Sitecore Experience Edge for Content Hub architecture read my blog https://himadritechblog.wordpress.com/2021/10/09/sitecore-experience-edge-api-architecture-and-a-postman-collection/

## Installation
The Cli is an npm package that can be installed globally in your machine using below cpmmand.

npm -i -g @himadric/xedge-cli

## Usage
To see command help you can always run the command with --help option.

### Setup
To set up your local with Sitecore Experience Edge URLs, run the below command. This needs to run only once unless your Experience Edge environment is modified.

xedge-setup-env --tkn_url <Token URL\> --aud_url \<Audience Url\> --adm_url \<Admin URL\> --key_url \<Preview URL\>

### Get JWT token
To get the JWT token

xedge-get-admin-token --ci \<Client ID\> --cs \<Client Secret\>

### Admin Commands
xedge-delete-cache --id \<Collection Id\>\
xedge-delete-content\
xedge-get-webhooks --id \<Webhook Id\>\
xedge-create-webhook -f \<json request file\>\
xedge-delete-webhook --id \<Webhook Id\>\
xedge-update-webhook -f \<json request file\>\
xedge-get-settings\
xedge-update-settings --contentCacheAutoClear \<true or false\> --mediaCacheAutoClear \<true or false\> --tenantCacheAutoClear \<true or false\> --contentCacheTtl \<duration\> --mediaCacheTtl \<duration\>

### Key Management Commands
xedge-create-api-key -f \<json request file\>\
xedge-get-api-key-by-hash -h \<hash value\>\
xedge-get-api-key-by-token -t \<token value\>\
xedge-get-api-keys\
xedge-rename-api-key-by-hash -h \<hash\> -n \<new name\>\
xedge-rename-api-key-by-token -t \<token\>\
xedge-revoke-api-key-by-hash -h \<hash\>\
xedge-revoke-api-key-by-token -t \<token\>

## Dependencies
This package borrowed code from https://github.com/treygriffith/netrc-rw