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
  var searchPhrase;
  $('.banners__submit').click(function() {
    searchPhrase=$('.banners__search').val();
    searchRequest(searchPhrase);
  });
  var textString;
  var searchRequest = function(searchKey) {
    var searchUrl = 'https://pixabay.com/api/?key=3641379-74c8a2cbe60ef2c004424aed7&q=' + searchKey + '&image_type=photo&per_page=7&orientation=vertical';
    var XHR = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
      var xhr = new XHR();
      xhr.open('GET', searchUrl, true);
      xhr.onload = function() {
          $('.banners__item').html('');
          for (var i=0; i < 7; i++) {
            textString = JSON.parse(this.responseText).hits[i].tags.charAt(0).toUpperCase() + JSON.parse(this.responseText).hits[i].tags.substring(1);
            if (i===4 || i===5) {
              $('.banners__item:eq(' + i + ')').append('<img src=' +JSON.parse(this.responseText).hits[i].webformatURL +'><span>' + textString + '</span>');
              continue;
            };
          $('.banners__item:eq(' + i + ')').append('<img src=' +JSON.parse(this.responseText).hits[i].webformatURL +'><span>' + textString + '</span>');
        };
      };
      xhr.onerror = function() {
        console.log('Ошибка ' + this.status);
      };
      xhr.send();
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
    // gutterWidth: 20
    gutter: 20
  });
});
