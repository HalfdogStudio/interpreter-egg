/*
 * 求值器
 * 内置关键字
 */
function evaluate(expr, env) {
  switch(expr.type) {
    case "value":
      return expr.value;
      break;
    case "word":
      if (expr.name in env) {
        return env[expr.name];
      } else {
        throw new ReferenceError("Undefined variable: " + expr.name);
      }
      break;
    case "apply":
      if (expr.operator.type == "word" && expr.operator.name in specialForms) {
        return specialForms[expr.operator.name](expr.args, env);
      }
      var op = evaluate(expr.operator, env);
      if (typeof op != "function") {
        throw new TypeError("Applying a non-function.");
      }
      return op.apply(null, expr.args.map(function(arg){
        return evaluate(arg, env);
      })); // 这里expr.args里还是表达式树。运行前要先求值。
  }
}

var specialForms = Object.create(null);

specialForms["if"] = function(args, env) {
  if (args.length !=3) {
    throw new SyntaxError("Bad number of args to if");
  }
  if (evaluate(args[0], env) !== false) {
    return evaluate(args[1], env);
  } else {
    return evaluate(args[2], env);
  }
};

specialForms["while"] = function(args, env) {
  if (args.length != 2) {
    throw new SyntaxError("Bad number of args to while");
  }

  while (evaluate(args[0], env) !== false) {
    evaluate(args[1], env);
  }
  // Egg 语言中没有undefined
  return false;
};

specialForms["do"] = function(args, env) {
  var value = false;
  args.forEach(function(arg) {
    value = evaluate(arg, env);
  });
  return value;
};

specialForms["define"] = function(args, env) {
  if (args.length != 2 || args[0].type != "word") {
    throw new SyntaxError("Bad use of define");
  } 
  var value = evaluate(args[1], env);
  env[args[0].name] = value;
  return value;
}

specialForms["set"] = function(args, env) {
  var curEnv;
  if (args.length !== 2 || args[0].type != "word") {
    throw new SyntaxError("Bad use of set");
  }
  var value = evaluate(args[1], env);
  while (env = Object.getPrototypeOf(env)) {
    if (Object.prototype.hasOwnProperty.call(env, args[0].name)) {
        env[args[0].name] = value;
        return value;
    }
  }
  throw ReferenceError("Not find " + args[0].name);
}

specialForms["fun"] = function(args, env) {
  if (args.length == 0) {
    throw new SyntaxError("Functions need a body");
  }

  var argNames = args.slice(0, args.length - 1).map(name);
  var body = args[args.length - 1];

  return function() {
    if(arguments.length != argNames.length) {
      throw new TypeError("Wrong number of arguments");
    }
    var localEnv = Object.create(env);
    for (var i = 0; i < argNames.length; i++) {
      localEnv[argNames[i]] = arguments[i];
    }
    return evaluate(body, localEnv);
  }
  
  function name(expr) {
    if(expr.type != "word") {
      throw new SyntaxError("Arg names must be words");
    }
    return expr.name;
  }

}

exports.evaluate = evaluate;
