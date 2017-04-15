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
  jQuery.support.cors = true;
  $.getJSON('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', {}, function(json){
    $('.informer_table').html('');
    $('.informer_table').append('<span class="currency_label">Приватбанк,<br> наличный курс</span>');
    $('.informer_table').append('<table><tr><th></th><th>Покупка</th><th>Продажа</th></tr>');
      for (var i=0; i<3; i++) {
        $('.informer_table').append('<tr><td>' + json[i].ccy + '</td><td>' +  (Math.round(json[i].buy * 1000) / 1000).toFixed(2) + '</td><td>' + (Math.round(json[i].sale * 1000) / 1000).toFixed(2) + '</td></tr>');
      }
    $('.informer_table').append('</table>');
  });
});
