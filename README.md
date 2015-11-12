Egg
----

A little language named Egg implemented above javascript.

It's simple. But support function closures, high-order functions and so on. And it could include nearly any logic you could imagine.

Just for fun, origin from my favorite [Eloquent Javascript](http://eloquentjavascript.net/11_language.html)。

All just for fun. 

Syntax
======

All is expressions. Valid expression are string/number/word/application.

```javascript
do(define (total, 0), 
   define (count, 1),
   while(<(count, 11),
         do(define(total, +(total, count)),
            define(count, +(count, 1)))),
   print(total))
```

### do 

Run multiple expressions one by one. Return the last expression.

    do(expr1[, expr2[, expr3[, ...]]])

### values

Valid values include string, number, true and false.

    1
    "hack"
    true
    false

### word

A name represent variables like values, function, nearly everything.

    a
    hehe
    define
    do
    print


### if 

Return different value depending on conditions;

    if(condition_expression, true_expression, false_expression)

### while 

Just like `while` in other languages. Return false.

    while(condition_expression, expression)

### define

Define a variable in current scope. Return expression's returned value

    define(word, expression)

### set

Set variables out of current scope, if there isn't exist, throw ReferenceError. Return the newly set value.

    set(word, expression)

### + - * / == < > 

Just as you see in other languages. These calculations are supported.

    +(1, 2)
    >(4, -(2, 1))

### fun

define a function. the last arguments will be the function body, all other arguments will be seen as arguments for this function.

    do(define(add, fun(a, b, +(a, b))),
       print(add(1, 2)))

REPL
==========

Run `egg.js`，just input your code line by line. <kbd>Ctrl-D</kbd> or <kbd>Ctrl-C</kbd>to exit:

```bash
┌─[reverland@reverland-R478-R429] - [~/tmp/eloquentjs] - [2015-11-12 03:16:54]
└─[0] <git:(master 976b113✱✈) > node egg.js
> do(define (total, 0), 
> ..define (count, 1),
> ..while(<(count, 11),
> ....do(define(total, +(total, count)),
> ......define(count, +(count, 1)))),
> ..print(total))
55
```

TODO
=====

- [ ] more tests...
- [X] repl
- [ ] compiler
- [ ] better parser. learn how Lex and Yacc works.
- [ ] evaluate when parse(JIT? :joy:)
- [ ] reread [Eloquent Javascript] and have fun with it :blush:
