function View(model) {
  var self = this;

  self.elements = {
    input: $('.service__input'),
    addBtn: $('.service__add'),
    taskContainer: $('.tasks')
  };

  self.initPage = function() {
    self.elements.taskContainer.html('');
    self.renderList(model.data);
    self.elements.input.val('');
  };

  self.renderList = function(data) {
    for (var i = 0; i < data.length; i++) {
      self.elements.taskContainer.append('<div class="tasks__task"><div class="tasks__txt">'+data[i]+'</div><div class="tasks__edt">&#9998;</div><div class="tasks__rmv">-</div></div>');
    };
  };

  self.initPage();
}


function Model(data) {
  var self = this;
  self.data = data;

  self.addItem = function(item) {
    self.data.push(item);
    return self.data;
  };

  self.removeItem = function(item) {
    self.data.splice(self.data.indexOf(item), 1);
    return self.data;
  };

  self.toEditItem = function(item) {
    return self.data.indexOf(item);
  };

  self.fromEditItem = function(itemIndex, item) {
    self.data[itemIndex] = item;
    return self.data;
  };
}


$(document).ready(function () {
    var model1 = new Model(['Задача 1', 'Задача 2', 'Задача 3']);
    var view1 = new View(model1);
    var controller1 = new Controller(model1,view1);
});


function Controller(model,view) {
  var self = this;

  view.elements.addBtn.on('click', function() {
    if (view.elements.input.val()==''){
        return;
    };
    if (!view.elements.addBtn.hasClass('service__edt')){
      model.addItem(view.elements.input.val());
      view.elements.input.val('');
      view.initPage();
    } else {
      model.fromEditItem(self.editingElement, view.elements.input.val());
      view.elements.addBtn.html('+').removeClass('service__edt');
      view.initPage();
    }
  });

  view.elements.taskContainer.on('click', '.tasks__rmv', function() {
    model.removeItem($(this).prev().prev().text());
    view.initPage();
  });

  view.elements.taskContainer.on('click', '.tasks__edt', function() {
    self.editingElement = model.toEditItem($(this).prev().text());
    view.elements.input.val($(this).prev().text());
    view.elements.addBtn.html('&#10000;').addClass('service__edt');
  });
}

