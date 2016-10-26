define (
  'model',
  [],
  function () {
    return {
      model: function(data) {
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
    };
  }
);