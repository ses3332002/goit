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
      };
