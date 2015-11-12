var topEnv = require('./env.js');
var process = require('process');
var readline = require('readline');
var parse = require('./parser.js').parse;
var evaluate = require('./evaluator.js').evaluate;

var rl = readline.createInterface(process.stdin, process.stdout);

function run() {
  var env = Object.create(topEnv);
  rl.prompt("> ")
  var program = ""
  var stack = 0;
  var inString = false;
  rl.on('line', function(line) {
    // 检查状态
    for (var i = 0; i < line.length; i++) {
      switch (line[i]){
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
    }
    // 用readline获取的换行符没了。。。换成readline
    line = line + '\n';
    // 搜集程序文本
    program += line;
    if (stack <= 0) {
      try {
        console.log(program)
        evaluate(parse(program), env);
      } catch (e) {
        console.log(e);
      }
      program = "";
      stack = 0;
    } 
    rl.setPrompt("> " + "..".repeat(stack));
    rl.prompt();
  });

  process.stdin.on("end", function() {
    console.log("\nbye~")
  })
}

run()
