$(document).ready(function(){
  $('.mycarousel').jcarousel({
    wrap: 'circular',
    animation: 'slow'
  });

  $('.mycarousel_prev').jcarouselControl({
    target: '-=1'
  });

  $('.mycarousel_next').jcarouselControl({
    target: '+=1'
  });

  $('.mycarousel_prev').click(function() {
    $('.mycarousel').jcarousel('scroll', '-=1');
  });

  $('.mycarousel_next').click(function() {
    $('.mycarousel').jcarousel('scroll', '+=1');
  });

  $('.jcarousel_pagination')
    .on('jcarouselpagination:active', 'a', function() {
      $(this).addClass('active');
    })
    .on('jcarouselpagination:inactive', 'a', function() {
      $(this).removeClass('active');
    })
    .jcarouselPagination();
    
    $('select').selectBox();
   
  $('.dropdown').hover(
    function() {
      $(this).children('.submenu').slideDown(200).animate({backgroundColor: "#424242"}, 500);
    },  
    function() {
      $(this).children('.submenu').slideUp(200).animate({backgroundColor: "#313131"}, 100);
    }
  );
});
