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
});
