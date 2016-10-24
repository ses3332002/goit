$(document).ready(function () {
    var model1 = new Model(['Задача 1', 'Задача 2', 'Задача 3']);
    var view1 = new View(model1);
    var controller1 = new Controller(model1,view1);
});
