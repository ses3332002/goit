$(document).ready(function(){

//инициализация слайдеров
  $('.owl-carousel').owlCarousel(
    {
      loop: true,
      margin: 1,
      nav: true,
      navText: '',
      responsive: {
        320: {
          items:1
        },
        748: {
          items:1
        },
        940: {
          items:1
        }
      }
    }
  );

//создание разметки для плитки
  for (var j=0; j < 7; j++) {
    if (j===4 || j===5) {
      $('.banners__content').append('<div class="banners__item banners__item-width2"></div>');
      continue;
    };
    $('.banners__content').append('<div class="banners__item"></div>');
  };

//поисковый запрос по нажатию кнопки
jQuery.support.cors = true;
  var searchPhrase;
  $('.banners__submit').click(function() {
    searchPhrase=$('.banners__search').val();
    searchRequest(searchPhrase);
  });
  var textString;
  var searchRequest = function(searchKey) {
    $.ajax({url:'http://api.pixplorer.co.uk/image?word=' + searchKey + '&amount=7?size=s', dataType: 'json', success: function(data) {
      $('.banners__item').html('');
      for (var i=0; i < data.images.length; i++) {
        textString = data.images[i].word.charAt(0).toUpperCase() + data.images[i].word.substring(1);
        if (i===4 || i===5) {
          $('.banners__item:eq(' + i + ')').append('<img src=' +data.images[i].imageurl +' height="100%" width="100%"><span>' + textString + '</span>');
          continue;
        };
      $('.banners__item:eq(' + i + ')').append('<img src=' +data.images[i].imageurl +' height="100%" width="100%"><span>' + textString + '</span>');
      }
    }, type: 'get'});
  };

//случайный поиск при инициализации
  searchRequest('');

//инициализация плитки
  $('.banners__content').masonry({
    // options
    containerWidth: 940,
    itemSelector: '.banners__item',
    isAnimated: true,
    isFitWidth: true,
    animationOptions: {
    duration: 400
  },
    isResizable: true,
    gutterWidth: 20
  });
});
