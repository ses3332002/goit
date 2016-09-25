(function($) {
  
  // значения по умолчанию
  var defaults = { car_hider_width: "650px", img_width: "200px" };

  var options;
    
  $.fn.myCarousel = function(params) {

    options = $.extend({}, defaults, options, params);
    var leftUIEl = $(".car_arrow-left");
    var rightUIEl = $(".car_arrow-right");
    var elementsList = $(".car_list");
    var pixelsOffset = parseInt(options.img_width) + 25;
    var currentLeftValue = 0;
    var elementsCount = elementsList.find("li").length;
    var minimumOffset = - ((elementsCount - 3) * pixelsOffset);
    var maximumOffset = 0;
    
    $(".car_hider").css("width", options.car_hider_width);
    $(".car_element").find("img").css("width", options.img_width);
    
    leftUIEl.click(function() {
      if (currentLeftValue != maximumOffset) {
        currentLeftValue += pixelsOffset;
        elementsList.animate({ left : currentLeftValue + "px"}, 500);
      }
    });

    rightUIEl.click(function() {
      if (currentLeftValue != minimumOffset) {
        currentLeftValue -= pixelsOffset;
        elementsList.animate({ left : currentLeftValue + "px"}, 500);
      }
    });
    
    return true;
  };
})(jQuery);