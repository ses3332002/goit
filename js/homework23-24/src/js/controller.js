define (
  'controller',
  [],
  function () {
    return {
      controller: function(model,view) {
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
    };
  }
);
