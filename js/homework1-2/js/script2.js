// создание и заполнение массива
var namesArray = [];

for (var i = 0; i < 5; i++) {
	namesArray[i] = prompt('Введите имя', 'Вася');
}

//поиск имени
var searchName = prompt('Введите имя для поиска в массиве', 'Вася');
var searchFlag = 0;
for (var i = 0; i < 5; i++) {
	if (namesArray[i] === searchName) {
		searchFlag++;
	}
}
if (searchFlag > 0) {
	alert(searchName + ', вы успешно вошли');
} else {
	alert('Имя не найдено');
}
