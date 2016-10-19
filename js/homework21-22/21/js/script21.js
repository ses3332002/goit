var pow = function(a, b) {
  
  var result;
  var extent = b;

  // проверка на ввод чисел

  if (!(!isNaN(parseFloat(a)) && isFinite(a)) || !(!isNaN(parseFloat(b)) && isFinite(b))) {
    result = 'Ввели не число';
    return result;
  }

  if ((parseInt(a,10) != a) || (parseInt(b,10) != b)) {
    result = 'Ввели не целое число';
    return result;
  }
  
  // расчет
  
  if (a == 0) {
    result = a + ' ^ ' + b + ' = 0';
    return result;
  }
  
  result = 1;
  
  if (b >= 0) {
    for (var i = 0; i < b; i++) {
      result = result * a;
    }
  } else {
    b = -1 * b;
    for (var i = 0; i < b; i++) {
      result = result * a;
    }
    result = 1 / result;
  }
  
  result = a + ' ^ ' + extent + ' = ' + result;
  return result;

}

// обертка для работы с node.js и jasmine

try {
  var x = prompt('Введите число', 0);
  var n = prompt('Введите степень', 1);
  console.log(pow(x, n));
} catch (e) {};

// обертка для работы с броузером

try {
  module.exports.pow = pow;
} catch (e) {};