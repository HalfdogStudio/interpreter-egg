Egg
----

A little language named Egg implemented above javascript.

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

    if while do define + - * / == < > true false fun


How to work
==========

Run `egg.js`，just input your code line by line. <kbd>Ctrl-D</kbd> to exit:

```bash
┌─[reverland@reverland-R478-R429] - [~/tmp/eloquentjs] - [2015-11-12 11:23:19]
└─[0] <git:(master 920fc9a✱) > node egg.js
>>> print(1)
1
>>> do(define (total, 0),
>>> ...define (count, 1),
>>> ...while(<(count, 11),
>>> ......do(define(total, +(total, count)),
>>> .........define(count, +(count, 1)))),
>>> ...print(total))
55
>>> 
bye~
```
