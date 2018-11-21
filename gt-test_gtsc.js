var gtp = require("./lib/gtsc/gtscriptparser");
gtp.context.addVariable("youtube_memes", "pewdiepie");

gtp.parse(`
#Comment here

`.split('\n'), null);