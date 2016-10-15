$(document).ready(function(){
  $('.mycarousel').jcarousel({
    wrap: 'circular',
    animation: 'slow'
  });

  $('.jcarousel_pagination')
    .on('jcarouselpagination:active', 'a', function() {
      $(this).addClass('active');
    })
    .on('jcarouselpagination:inactive', 'a', function() {
      $(this).removeClass('active');
    })
    .jcarouselPagination();
});
