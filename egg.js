var topEnv = require('./env.js');
var process = require('process');
var parse = require('./parser.js').parse;
var evaluate = require('./evaluator.js').evaluate;

function run() {
  var env = Object.create(topEnv);
  process.stdin.resume();
  var program = ""
  process.stdin.on('data', function(data) {
    program += data.toString()
  })
  process.stdin.on("end", function() {
    console.log("output:")
    try {
      evaluate(parse(program.toString()), env);
    } catch (e) {
      console.log(e);
    }
  })
}

run()
