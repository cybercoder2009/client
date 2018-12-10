const repl = require("repl");

// const host = process.argv[2] || '127.0.0.1'
// const port = process.argv[3] || 8546

let context = repl.start(promptPrefix + '> ').context;