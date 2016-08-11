function pow(a, b) {

  // проверка на ввод чисел

  if (isNaN(a * 2) || isNaN(b * 2)) {
    alert('Ввели не число');
    return;
  }

  // расчет

  var result = 1;
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
console.log(pow(x, n));
