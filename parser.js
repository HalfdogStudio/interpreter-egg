// A simple language named Egg
// 一切都是表达式
// 表达式可能包含表达式
// 数字、字符串类型是值，值是对应的值
// 词是另一种类型，有一个名字
// 应用是一种特殊的值，包括操作符表达式、参数表达式列表
// parseExpression(program)
// {
//  expr: expr,
//  rest: program
// }
// parseApply(expr, program)
// (a,b,c)

function parseExpression(program) {
  //console.log("parseExpression: " + program);
  program = skipSpace(program);
  var match, expr, rest;
  if (match = /^\d+/.exec(program)) {
    expr = {type: "value", value: Number(match[0])};
  } else if (match = /^"([^"]*)"/.exec(program)) {
    expr = {type: "value", value: match[1]};
  } else if (match = /^[^\s"(),]+/.exec(program)) {
    expr = {type: "word", name: match[0]};
    var afterword = skipSpace(program.slice(match[0].length));
    if (afterword.slice(0, 1) == "(") {
      return parseApply(expr, afterword.slice(1));
    } 
  } else {
    throw new SyntaxError("Not valid Egg expression!")
  } 
  return {expr: expr, rest: program.slice(match[0].length)}; 
}

function parseApply(expr, program) {
  //console.log("parseApply: " + program);
  program = skipSpace(program);  // 如果(后面有空格
  expr = {type: "apply", operator: expr, args: []};
  while (program.slice(0, 1) != ")") { // 如果用program[0]program不一定存在
    //console.log("apply argument: " + program);
    var arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);
    if (program.slice(0, 1) == ",") {
      program = skipSpace(program.slice(1));
      // 这种情况只是`a(b, )`，我不想支持这种情况
      if (program.slice(0, 1) == ")") {
        throw new SyntaxError("Not valid Egg expression!")
      }
    } else if (program.slice(0, 1) != ')'){
      throw new SyntaxError("Egg expect ',' or ')'"); // 因为a(a b)如果没有这个条件会当两个参数
    }
  }
  program = program.slice(1); //移除)
  program = skipSpace(program);
  if (program.slice(0, 1) == '(') {
    return parseApply(expr, program.slice(1));
  } else {
    return {expr: expr, rest: program};
  }
}
function skipSpace(s) {
  var space = /^(\s|#.*)*/;
  if (match = space.exec(s)) {
    s = s.slice(match[0].length);
  }
  return s;
}

function parse(program) {
  var result = parseExpression(program);
  if (skipSpace(result.rest).length != 0) {
    throw new SyntaxError("Egg unexpected text after program!")
  }
  return result.expr;
}

exports.skipSpace = skipSpace;
exports.parseExpression = parseExpression;
exports.parseApply = parseApply;
exports.parse = parse;
