const path = require("path");

module.exports = path.dirname(
  require.main ? require.main.filename : process.argv[1]
);
