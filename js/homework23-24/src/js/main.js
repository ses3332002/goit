requirejs.config ({
  paths: {
    'jquery': 'https://code.jquery.com/jquery-3.1.0.min'
  }
});

require (
  [
    'jquery',
    'model',
    'view',
    'controller'
  ], function ($, model, view, controller) {
    var model1 = new model.model(['Задача 1', 'Задача 2', 'Задача 3']);
    var view1 = new view.view(model1);
    var controller1 = new controller.controller(model1,view1);
  }
);
