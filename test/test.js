var parser = require('../parser.js');

describe("skipSpace", function() {
  it("should skip prefix spaces", function() {
    parser.skipSpace("   a").should.equal('a');
  })
});

describe("parse", function() {
  it("should parse numbers and leave rest", function() {
    var value = { expr: { type: 'value', value: 1 }, rest: ' 1' }
    parser.parseExpression('1 1').should.eql(value);
  })
  it("should parse strings and leave rest", function() {
    var value = { expr: { type: 'value', value: 's' }, rest: ', ,' };
    parser.parseExpression('"s", ,').should.eql(value);
  })
  it("should parse word not followed by '('", function() {
    var value = { expr: { type: 'word', name: 'word' }, rest: ' ,' };
    parser.parseExpression('word ,').should.eql(value);
  })
  it("should parse apply if word followed by '('", function() {
    var value = { expr: { type: 'apply',
      operator: { type: 'word', name: 'word' },
    args: [ { type: 'word', name: 'a' } ] },
    rest: 'r ' }
    parser.parseExpression('word ( a ) r ').should.eql(value);
  })
  it("should parse apply with multiple arguments", function() {
    var value = 
      { expr: 
        { type: 'apply',
          operator: { type: 'word', name: 'word' },
          args:  [ { type: 'word', name: 'a' },
            { type: 'word', name: 'b' },
            { type: 'word', name: 'c' } ] },
        rest: '' }
    parser.parseExpression('word (a, b, c)').should.eql(value);
  })
  it("should parse apply with no args", function() {
    var value = 
      { expr: 
        { type: 'apply',
          operator: { type: 'word', name: 'word' },
          args: [] },
      rest: '' }
    parser.parseExpression('word ( )').should.eql(value);
  })
  it("should apply can be chain", function() {
    var value = 
        { expr: 
          { type: 'apply',
            operator: { 
              type: 'apply', 
              operator: { type: 'word', name: 'word' },
              args: [ { type: 'word', name: 'a' }, { type: 'word', name: 'b' } ]
            },
            args: [ { type: 'word', name: 'c' }, { type: 'word', name: 'd' } ]
          },
          rest: '' };
    parser.parseExpression('word (a , b ) (c, d)').should.eql(value);
  })
  it("should have syntax error if not valid", function() {
    (function(){parser.parseExpression('')}).should.throw("Not valid Egg expression!");
    (function(){parser.parseExpression('a(,')}).should.throw("Not valid Egg expression!");
    (function(){parser.parseExpression('a( )(')}).should.throw("Not valid Egg expression!");
    (function(){parser.parseExpression('a(, )')}).should.throw("Not valid Egg expression!");
  })
  it("should have not expected , or ) if not correct seperator", function() {
    (function(){parser.parseExpression('word (a b)')}).should.throw("Egg expect ',' or ')'");
    (function(){parser.parseExpression('a(a')}).should.throw("Egg expect ',' or ')'");
  })
  it("parse should throw when there are rest", function(){
    (function() {parser.parse("+(a,b) e")}).should.throw("Egg unexpected text after program!")
  })
  it("parse should work well otherwise", function(){
    var value = 
      { type: 'apply',
        operator: { type: 'word', name: '+' },
        args: [ { type: 'word', name: 'a' }, { type: 'word', name: 'b' } ] }
    parser.parse("+(a,b)").should.eql(value);
  })
})
