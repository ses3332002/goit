var test1 = require ('../js/script21.js');

describe('pow', function() {
  it('with numbers', function() {
    var testResult = test1.pow(2,3);
    expect(testResult).toBe('2 ^ 3 = 8');
  });
  it('with strings', function() {
    var testResult = test1.pow('rere',3);
    expect(testResult).toBe('Ввели не число');
  });
  it('with wrong numbers', function() {
    var testResult = test1.pow(2.2,3);
    expect(testResult).toBe('Ввели не целое число');
  });
  it('with zero', function() {
    var testResult = test1.pow(0,3);
    expect(testResult).toBe('0 ^ 3 = 0');
  });
});