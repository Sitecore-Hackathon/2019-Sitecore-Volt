"use strict";
var xml2js = require("xml2js");
var fs = require("fs");

var sitecorevolt = {};

sitecorevolt.getConfiguration = function getConfigFile(filename) {
  var data = fs.readFileSync(filename);

  var parser = new xml2js.Parser();
  var content;
  parser.parseString(data, function (err, result) {
    if (err !== null) throw err;
    content = result;
  });
  return content;
};

sitecorevolt.getSiteUrl = function getSiteUrl(options) {
  if (!options) options = {};

    var publishFile = options.publishingSettingsFile ? options.publishingSettingsFile : sitecorevolt.getPublishingSettingsFile();
  try {
    var configuration = sitecorevolt.getConfiguration(publishFile);
    return configuration.Project.PropertyGroup[0].publishUrl[0];
  } catch(error) {
    error.message = "Could not get the sitecorevolt site URL from '" + publishFile + "'. Error:" + error.message;
    throw(error);
  }
};

sitecorevolt.getPublishingSettingsFile = function getPublishingSettingsFile() {
    if (fs.existsSync("./publishsettings.targets.user"))
        return "./publishsettings.targets.user";
    return "./publishsettings.targets";
}

module.exports = sitecorevolt;