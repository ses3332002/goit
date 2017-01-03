$(document).ready(function(){

//инициализация слайдеров
  $('.owl-carousel').owlCarousel(
    {
      loop: true,
      margin: 1,
      // nav: true,
      nav: false,
      dots: true,
      animateOut: 'fadeOut',
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
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
  // for (var j=0; j < 7; j++) {
  //   if (j===4 || j===5) {
  //     $('.banners__content').append('<div class="banners__item banners__item-width2"></div>');
  //     continue;
  //   };
  //   $('.banners__content').append('<div class="banners__item"></div>');
  // };

//поисковый запрос по нажатию кнопки или Enter
  // jQuery.support.cors = true;
  // var searchPhrase;
  // $('.banners__submit').click(function() {
  //   searchPhrase=$('.banners__search').val();
  //   searchRequest(searchPhrase);
  // });
  // $('.banners__search').keydown(function(eventObject) {
  //   if (eventObject.which==13) {
  //     searchPhrase=$('.banners__search').val();
  //     searchRequest(searchPhrase);
  //   };
  // });
  // var textString;
  // var searchRequest = function(searchKey) {
  //   $.ajax({url:'https://pixabay.com/api/?key=3641379-74c8a2cbe60ef2c004424aed7&q=' + searchKey + '&image_type=photo&per_page=7&orientation=vertical', dataType: 'json', success: function(data) {
  //     $('.banners__item').html('');
  //     for (var i=0; i < 7; i++) {
  //       textString = data.hits[i].tags.charAt(0).toUpperCase() + data.hits[i].tags.substring(1);
  //       if (i===4 || i===5) {
  //         $('.banners__item:eq(' + i + ')').append('<a href="' + data.hits[i].pageURL + '" target="_blank"><img src=' +data.hits[i].webformatURL +'></a><span>' + textString + '</span>');
  //         continue;
  //       };
  //     $('.banners__item:eq(' + i + ')').append('<a href="' + data.hits[i].pageURL + '" target="_blank"><img src=' +data.hits[i].webformatURL +'></a><span>' + textString + '</span>');
  //     }
  //   }, type: 'get'});
  // };

//случайный поиск при инициализации
  // searchRequest('');

//инициализация плитки
  // $('.banners__content').masonry({
  //   // options
  //   containerWidth: 940,
  //   itemSelector: '.banners__item',
  //   isAnimated: true,
  //   isFitWidth: true,
  //   animationOptions: {
  //   duration: 400
  // },
  //   isResizable: true,
  //   gutterWidth: 20
  //   // gutter: 20
  // });

  var note = $('#note');
  // ts = new Date(2012, 0, 1),
  // newYear = true;

  // if((new Date()) > ts){
    // Задаем точку отсчета для примера. Пусть будет очередной Новый год или дата через 10 дней.
    // Обратите внимание на *1000 в конце - время должно задаваться в миллисекундах
    ts = (new Date()).getTime() + 4*24*60*60*1000;
  //   newYear = false;
  // }

  function wordend(num, words) {
    if((num=Math.abs(num%100)) > 20) num%=10;
    return words[ (num > 4 || num === 0) + (num !== 1) ];
  };

  $('#countdown').countdown({
    timestamp	: ts,
    callback	: function(days, hours, minutes, seconds){

      var message = "До конца акции осталось: <span>";
    // alert(wordend(5, ['день','дня','дней']));

      message += days + wordend(days, [' день, ',' дня, ',' дней, ']);
      message += hours + wordend(hours, [' час, ',' часа, ',' часов, ']);
      message += minutes + wordend(minutes, [' минута.',' минуты.',' минут.']) + '</span>';
      // message += "секунд: " + seconds + " <br />";

      // if(newYear){
      //   message += "осталось до Нового года!";
      // }
      // else {
      // }

      note.html(message);
    }
  });
});
