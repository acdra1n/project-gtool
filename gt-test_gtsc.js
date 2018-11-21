var gtp = require("./lib/gtsc/gtscriptparser");
gtp.context.addVariable("youtube_memes", "pewdiepie");
var fs = require('fs');
gtp.parse(fs.readFileSync("gt-test_gtsc_script.gtsc", "utf8").split('\n'), null);