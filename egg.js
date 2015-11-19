var topEnv = require('./env.js');
var process = require('process');
var readline = require('readline');
var parse = require('./parser.js').parse;
var evaluate = require('./evaluator.js').evaluate;
var specialForms = require('./evaluator.js').specialForms;
var __version__ = 0.3;


function run() {
  // env
  var env = Object.create(topEnv);
  env["version"] = function() {
    console.log(__version__);
  };
  // rl interface
  var rl = readline.createInterface(process.stdin, process.stdout, completer);
  rl.prompt("> ");
  var program = "";
  var stack = 0;
  var inString = false;
  rl.on('line', function(line) {
    // 检查状态
    for (var i = 0; i < line.length; i++) {
      switch (line[i]) {
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
        //console.log(program)
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

  function completer(line) {
    //console.log(allProperties(env));
    var word = line.split(/[\s(),"]+/).slice(-1)[0];
    // 用于拼接在匹配部分之前
    line = line.slice(-word.length);
    //console.log(line);
    //console.log(word);
    var hits = Object.keys(specialForms).concat(allProperties(env)).filter(function(key) {
      return key.indexOf(word) == 0;
    })
    return [hits, line];
  }
}

function allProperties(o) {
  //console.log(Object.getPrototypeOf(o));
  var keys = Object.keys(o);
  var proto = o;
  while (proto = Object.getPrototypeOf(proto)) {
    keys = keys.concat(Object.keys(proto));
    // console.log(keys);
  }
  return keys;
}

run()
