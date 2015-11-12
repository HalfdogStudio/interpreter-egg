/*
 * 环境和内置函数
 */
var topEnv = Object.create(null);

topEnv['true'] = true;
topEnv['false'] = false;

["+", "-", "*", "/", "==", "<", ">"].forEach(function(op) {
  topEnv[op] = new Function("a", "b", "return a " + op + " b;");
});

// print函数
topEnv["print"] = function() {
  console.log.apply(null, arguments);
  return true;
}

topEnv["array"] = function() {
  return [].slice.apply(arguments);
}

topEnv["length"] = function(array) {
  if (!(array instanceof Array)) {
    throw new TypeError("arg for length must be array");
  }
  return array.length;
}

topEnv["element"] = function(array, n) {
  if (!(array instanceof Array)) {
    throw new TypeError("arg for element must be array");
  }
  if (!(n >= 0 && n <= array.length - 1)) {
    throw new RangeError("out of range for array index");
  }
  return array[n];
}


module.exports = topEnv;
