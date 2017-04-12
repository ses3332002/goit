$(document).ready(function(){

// всплывающее окно с readme
// $('body').append('<div class="readme">Особенности сайта:<div class="readme__message"></div><button class="readme__button">Закрыть</button></div>');

// $('.readme__message').load('readme.html');
// $('.readme').show();
//
// $('.readme__button').click(function(){
//   $('.readme').hide();
// });

//инициализация слайдеров
  $('.owl-carousel').owlCarousel(
    {
      loop: true,
      margin: 1,
      nav: false,
      dots: true,
      animateOut: 'fadeOut',
      autoplay: false,
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

//прогресс-бар и анимация
  // $(window).on("scroll resize", function() {
  //   var o = $(window).scrollTop() / ($(document).height() - $(window).height());
  //   $('.progress__bar').css({"width": (100 * o | 0) + "%"});
  //   // $('.progress').value = o;
  //   if (($(window).scrollTop() < 460) || ($(window).width() < 748)) {
  //     $('.back__top').hide(700);
  //   } else {
  //     $('.back__top').show(700);
  //   };
  //   if (($(window).scrollTop() < 460) || ($(window).width() < 748)) {
  //     $('.easy123__part:eq(0)').delay(500).animate({
  //       opacity: 1
  //     }, 'slow');
  //     $('.easy123__part:eq(1)').delay(1500).animate({
  //       opacity: 1
  //     }, 'slow');
  //     $('.easy123__part:eq(2)').delay(2500).animate({
  //       opacity: 1
  //     }, 'slow');
  //   };
  // });

//кнопка вверх
  // $('.back__up').click(function() {
  //   $('body,html').animate({scrollTop:0}, 'slow');
  //   return false;
  // });

//подготовка галереи
// for (var i=0; i < 6; i++) {
//   $('#gallery').append('<img alt="Слон ' + (i+1) + '">');
// };

//поисковый запрос
  // jQuery.support.cors = true;
  // var searchRequest = function(searchKey) {
  //   $.ajax({url:'https://pixabay.com/api/?key=3641379-74c8a2cbe60ef2c004424aed7&q=' + searchKey + '&image_type=photo&orientation=horizontal', dataType: 'json', success: function(data) {
  //     for (var i=0; i < 6; i++) {
  //       $('#gallery img:eq(' + i + ')').attr({"src":data.hits[i].webformatURL, "data-image":data.hits[i].webformatURL});
  //     };
  //     $('#gallery').css("display", "none");
  //     $("#gallery").unitegallery({
  //       tile_width: 260,						//tile width
  //       tile_height: 260,						//tile height
  //       theme_gallery_padding: 0,				//the padding of the gallery wrapper
  //       theme_carousel_align: "center",			//the align of the carousel
  //       theme_carousel_offset: 0,				//the offset of the carousel from the align sides
  //       gallery_theme: "carousel",				//choose gallery theme (if more then one themes includes)
  //       gallery_width:"100%",				//gallery width
  //       gallery_min_width: 260,				//gallery minimal width when resizing
  //       gallery_background_color: "",		//set custom background color. If not set it will be taken from css.
  //       carousel_padding: 8,					//padding at the sides of the carousel
  //       carousel_space_between_tiles: 15,		//space between tiles
  //       carousel_navigation_numtiles:3,			//number of tiles to scroll when user clicks on next/prev button
  //       carousel_scroll_duration:500,			//duration of scrolling to tile
  //       carousel_scroll_easing:"easeOutCubic",	//easing of scrolling to tile animation
  //       carousel_autoplay: true,				//true,false - autoplay of the carousel on start
  //       carousel_autoplay_timeout: 3000,		//autoplay timeout
  //       carousel_autoplay_direction: "right",	//left,right - autoplay direction
  //       carousel_autoplay_pause_onhover: true,	//pause the autoplay on mouse over
  //       theme_enable_navigation: true,
  //       theme_navigation_position: "bottom",	//top,bottom: the vertical position of the navigation reative to the carousel
  //       theme_navigation_enable_play: true,		//enable / disable the play button of the navigation
  //       theme_navigation_align: "center",		//the align of the navigation
  //       theme_navigation_offset_hor: 0,			//horizontal offset of the navigation
  //       theme_navigation_margin: 20,			//the space between the carousel and the navigation
  //       theme_space_between_arrows: 5			//the space between arrows in the navigation
  //     });
  //   }, type: 'get'});
  // };

//случайный поиск при инициализации
  // searchRequest('elephant');

  // var note = $('#note');
  // ts = new Date(2012, 0, 1),
  // newYear = true;

  // if((new Date()) > ts){
    // Задаем точку отсчета для примера. Пусть будет очередной Новый год или дата через 10 дней.
    // Обратите внимание на *1000 в конце - время должно задаваться в миллисекундах
    // ts = (new Date()).getTime() + 4*24*60*60*1000;
  //   newYear = false;
  // }

  // function wordend(num, words) {
  //   if((num=Math.abs(num%100)) > 20) num%=10;
  //   return words[ (num > 4 || num === 0) + (num !== 1) ];
  // };

  // $('#countdown').countdown({
  //   timestamp	: ts,
  //   callback	: function(days, hours, minutes, seconds) {
  //     var message = "До конца акции осталось: <span>";
  //     message += days + wordend(days, [' день, ',' дня, ',' дней, ']);
  //     message += hours + wordend(hours, [' час, ',' часа, ',' часов, ']);
  //     message += minutes + wordend(minutes, [' минута.',' минуты.',' минут.']) + '</span>';
  //     note.html(message);
  //   }
  // });

  $('.accordion__content').hide();
  $('.active').next().show();

  $('.accordion').click(function() {
    if (!$(this).hasClass('active')) {
      $(this).siblings('.accordion__content').hide('slow');
      $(this).next('.accordion__content').show('slow');
      $(this).toggleClass('active');
      $(this).siblings('.accordion').removeClass('active');
    };
  });

});
