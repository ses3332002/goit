function pow(a, b) {

  // проверка на ввод чисел

  if (isNaN(a * 2) || isNaN(b * 2)) {
    alert('Ввели не число');
    return;
  }
  
  if ((a.indexOf('.') + 1) || (b.indexOf('.') + 1)) {
    alert('Ввели не целое число');
    return;
  }
  
  // расчет

  var result = 1;
  
  if (a === 0) {
    result = 0;
    return result;
  }
  
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
  
  return result;

}

var x = prompt('Введите число', 0);
var n = prompt('Введите степень', 1);
console.log(x, ' ^ ', n, ' = ', pow(x, n));
