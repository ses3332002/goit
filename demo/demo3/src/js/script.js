'use strict';
$(document).ready(function () {
  //slider initialization
  $('.owl-carousel').owlCarousel({
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
        items: 1,
      },
      748: {
        items: 1,
      },
      1024: {
        items: 1,
      },
    },
  });

  $('.accordion__content').hide();
  $('.accordion-active').next().show();

  $('.accordion').click(function () {
    $(this).find('i').toggleClass('fa-arrow-down fa-arrow-up');
    if (!$(this).hasClass('accordion-active')) {
      $(this).toggleClass('accordion-active');
      $(this).next('.accordion__content').show('slow');
    } else {
      $(this).toggleClass('accordion-active');
      $(this).next('.accordion__content').hide('slow');
    }
  });

  // menu opening and closing
  $('.nav__bars').click(function () {
    $(this).toggleClass('fa-bars fa-close');
    $('.nav__menu').toggleClass('nav__menu-opened');
  });

  let APIKEY = 'b886dd4b03e8d5aa871a26169725d822';
  let APIKEY2 = '76b0c213a9334f2d9a3267f2e43808da';
  jQuery.support.cors = true;

  let curCashe = {};
  let weaCashe = {};

  let timeMark;

  let curData = {};
  let weaData = {};

  //local storage checking for currency
  if (!localStorage.getItem('valuta')) {
    curRequest();
  } else {
    timeMark = new Date();
    curCashe = JSON.parse(localStorage.getItem('valuta'));
    if (+timeMark - +curCashe.time > 3600000) {
      curRequest();
    } else {
      fillCur();
    }
  }

  //local storage checking for weather
  if (!localStorage.getItem('pogoda')) {
    weaRequest();
  } else {
    timeMark = new Date();
    weaCashe = JSON.parse(localStorage.getItem('pogoda'));
    if (+timeMark - +weaCashe.time > 3600000) {
      weaRequest();
    } else {
      fillWea();
    }
  }

  function fillCur() {
    curCashe = JSON.parse(localStorage.getItem('valuta'));
    $('.informer-currency .informer__table').html('');
    $('.informer-currency .informer__table').append(
      '<span class="currency_label">Приватбанк,<br> наличный курс</span>'
    );
    $('.informer-currency .informer__table').append(
      '<table><tr><th></th><th>Покупка</th><th>Продажа</th></tr>'
    );
    for (let i = 0; i < 3; i++) {
      $('.informer-currency .informer__table').append(
        '<tr><td class="currency_name"><i class="fa fa-fw"></i>' +
          curCashe.json[i].ccy +
          '</td><td>' +
          (Math.round(curCashe.json[i].buy * 1000) / 1000).toFixed(2) +
          '</td><td>' +
          (Math.round(curCashe.json[i].sale * 1000) / 1000).toFixed(2) +
          '</td></tr>'
      );
    }
    $('.informer-currency .informer__table').append('</table>');
    $('td:contains("RUR")').css('color', 'red').find('i').addClass('fa-rub');
    $('td:contains("EUR")').css('color', 'blue').find('i').addClass('fa-eur');
    $('td:contains("USD")').css('color', 'green').find('i').addClass('fa-usd');
  }

  function fillWea() {
    weaCashe = JSON.parse(localStorage.getItem('pogoda'));
    $('.informer-weather .informer__table').html('');
    $('.informer-weather .informer__table').append(
      '<img src="https://www.weatherbit.io/static/img/icons/' +
        weaCashe.json.data[0].weather.icon +
        '.png">'
    );
    $('.informer-weather .informer__table').append(
      '<p class="weather_description">' +
        weaCashe.json.data[0].weather.description +
        '</p>'
    );
    $('.informer-weather .informer__table').append(
      '<p class="temp">' +
        Math.round(weaCashe.json.data[0].temp) +
        '&deg; C</p>'
    );
    if (Math.round(weaCashe.json.data[0].temp) > 0) {
      $('.temp').css('color', 'red');
    } else {
      $('.temp').css('color', 'blue');
    }
    $('.informer-weather .informer__table').append(
      '<p class="wind_description">ветер: ' +
        Math.round(weaCashe.json.data[0].wind_spd) +
        ' м/с</p>'
    );
  }

  function curRequest() {
    $.getJSON(
      'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
      {},
      function (json) {
        curData.json = json;
        timeMark = new Date();
        curData.time = timeMark.valueOf();
        localStorage.setItem('valuta', JSON.stringify(curData));
        fillCur();
      }
    );
  }

  function weaRequest() {
    $.getJSON(
      'https://api.weatherbit.io/v2.0/current?city_id=710791&lang=ru&key=' +
        APIKEY2,
      {},
      function (json) {
        weaData.json = json;
        timeMark = new Date();
        weaData.time = timeMark.valueOf();
        localStorage.setItem('pogoda', JSON.stringify(weaData));
        fillWea();
      }
    );
  }
});
