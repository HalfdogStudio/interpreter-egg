var topEnv = require('./env.js');
var process = require('process');
var parse = require('./parser.js').parse;
var evaluate = require('./evaluator.js').evaluate;

function run() {
  var env = Object.create(topEnv);
  process.stdin.resume();
  process.stdout.write(">>> ");
  var program = ""
  var stack = 0;
  var inString = false;
  process.stdin.on('data', function(data) {
    var line = data.toString();
    var index;
    struct(line.slice(0,1), line.slice(1));
    program += line;
    if (stack == 0) {
      try {
        evaluate(parse(program.toString()), env);
      } catch (e) {
        console.log(e);
      }
      program = "";
    } 
    process.stdout.write(">>> " + '...'.repeat(stack));
    function struct(c, r) {
      if (r == "") {
        return "";
      }
      switch (c){
        case '"':
          inString = !inString;
          break;
        case '(':
          if (inString) {
            break;
          }
          stack++;
          break;
        case ')':
          if (inString) {
            break;
          }
          stack--;
          break
      }
      struct(r.slice(0, 1), r.slice(1))
    }
  });

  process.stdin.on("end", function() {
    console.log("\nbye~")
  })
}

run()
