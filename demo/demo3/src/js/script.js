$(document).ready(function(){

//инициализация слайдеров
  $('.owl-carousel').owlCarousel(
    {
      loop: true,
      margin: 1,
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

  $('.accordion__content').hide();
  $('.accordion-active').next().show();

  $('.accordion').click(function() {
    $(this).find("i").toggleClass("fa-arrow-down fa-arrow-up");
    if (!$(this).hasClass('accordion-active')) {
      $(this).toggleClass('accordion-active');
      $(this).next('.accordion__content').show('slow');
    }else{
      $(this).toggleClass('accordion-active');
      $(this).next('.accordion__content').hide('slow');
    };
  });

  //поисковый запрос
  var APIKEY = 'b886dd4b03e8d5aa871a26169725d822';
  jQuery.support.cors = true;
  $.getJSON('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', {}, function(json){
    $('.footer__informer-currency .informer_table').html('');
    $('.footer__informer-currency .informer_table').append('<span class="currency_label">Приватбанк,<br> наличный курс</span>');
    $('.footer__informer-currency .informer_table').append('<table><tr><th></th><th>Покупка</th><th>Продажа</th></tr>');
      for (var i=0; i<3; i++) {
        $('.footer__informer-currency .informer_table').append('<tr><td class="currency_name"><i class="fa fa-fw"></i>' + json[i].ccy + '</td><td>' +  (Math.round(json[i].buy * 1000) / 1000).toFixed(2) + '</td><td>' + (Math.round(json[i].sale * 1000) / 1000).toFixed(2) + '</td></tr>');
      }
    $('.footer__informer-currency .informer_table').append('</table>');
    $('td:contains("RUR")').css("color","red").find('i').addClass('fa-rub');
    $('td:contains("EUR")').css("color","blue").find('i').addClass('fa-eur');
    $('td:contains("USD")').css("color","green").find('i').addClass('fa-usd');
  });

  $.getJSON('http://api.openweathermap.org/data/2.5/weather?id=710791&APPID=' + APIKEY + '&units=metric&lang=ru ', {}, function(json){
    $('.footer__informer-weather .informer_table').html('');
    $('.footer__informer-weather .informer_table').append('<img src="http://openweathermap.org/img/w/' + json.weather[0].icon + '.png">');
    $('.footer__informer-weather .informer_table').append('<p class="weather_description">' + json.weather[0].description + '</p>');
    $('.footer__informer-weather .informer_table').append('<p class="temp">' + Math.round(json.main.temp) + '&deg; C</p>');
    if (Math.round(json.main.temp) > 0) {
      $('.temp').css("color","red");
    } else {
      $('.temp').css("color","blue");
    };
    $('.footer__informer-weather .informer_table').append('<p class="weather_description">ветер: ' + Math.round(json.wind.speed) + ' м/с</p>');
  });
});
