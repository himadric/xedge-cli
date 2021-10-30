const chalk = require("chalk");
const netrc = require("../netrc/netrc");

exports = module.exports = new Helpers();
module.exports.Helpers = Helpers;

function Helpers(hostName) {
    this.hostName = hostName || "xedge.auth0";
}

Helpers.prototype.hostExist = function () {
    if(!netrc.hasHost(this.hostName))
    {
        const needToRunSetup = chalk.red.bold("ERROR: Missing URLs. Please run setup-env before running get-admin-token. For more information run setup-end --help.");
        throw new Error(needToRunSetup);
    }
}

Helpers.prototype.getTokenUrl = function () {
    this.hostExist();
    return netrc.host(this.hostName).token_url;
}

Helpers.prototype.getAudienceUrl = function () {
    this.hostExist();
    return netrc.host(this.hostName).audience_url;
}

Helpers.prototype.getAdminUrl = function () {
    this.hostExist();
    return netrc.host(this.hostName).admin_url;
}

Helpers.prototype.getKeyUrl = function () {
    this.hostExist();
    return netrc.host(this.hostName).key_url;
}

Helpers.prototype.getToken = function () {
    this.hostExist();
    return netrc.host(this.hostName).token;
}

Helpers.prototype.setTokenUrl = function (url) {
    this.hostExist();
    netrc.host(this.hostName).token_url = url;
}

Helpers.prototype.setAudienceUrl = function (url) {
    this.hostExist();
    netrc.host(this.hostName).audience_url = url;
}

Helpers.prototype.setAdminUrl = function (url) {
    this.hostExist();
    netrc.host(this.hostName).admin_url = url;
}

Helpers.prototype.setKeyUrl = function (url) {
    this.hostExist();
    netrc.host(this.hostName).key_url = url;
}

Helpers.prototype.setToken = function (token) {
    this.hostExist();
    netrc.host(this.hostName).token = token;
}