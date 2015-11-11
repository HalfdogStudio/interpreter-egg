Egg
----

A little language implemention on javascript.

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

Support:

  if while do define + - * / == < > true false


How to work
==========

Run `egg.js`，<kbd>Ctrl-D</kbd> to finish input:

```bash
┌─[reverland@reverland-R478-R429] - [~/tmp/eloquentjs] - [2015-11-12 12:27:18]
└─[130] <> node egg.js
do(define (total, 0), 
   define (count, 1),
   while(<(count, 11),
         do(define(total, +(total, count)),
            define(count, +(count, 1)))),
   print(total))

output:
55
```
