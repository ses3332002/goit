// создание и заполнение массива
var namesArray = [];

for (var i = 0; i < 5; i++) {
	namesArray[i] = prompt('Введите имя', '');
}

//поиск имени
var searchName = prompt('Введите имя для поиска в массиве', '');
var searchFlag =  false;
for (var i = 0; i < namesArray.length; i++) {
	if (namesArray[i] === searchName) {
		searchFlag = true;
	}
}
if (searchFlag) {
	alert(searchName + ', вы успешно вошли');
} else {
	alert('Имя не найдено');
}
