$(document).ready(function(){
  // $('.mycarousel').jcarousel({
  //   wrap: 'circular',
  //   animation: 'slow'
  // });

  $('.owl-carousel').owlCarousel(
    {
      loop:true,
      margin:1,
      nav:true,
      navText:'',
      responsive:{
          320:{
              items:1
          },
          748:{
              items:1
          },
          940:{
              items:1
          }
      }
  }
);

  $('.banners__content').masonry({
    // options
    itemSelector: '.banners__item',
    singleMode: false,
    isResizable: true,
    // columnWidth: '.banners__item',
    gutter: 20
  });

  var searchPhrase;
  $('.banners__submit').click(function() {
    searchPhrase=$('.banners__search').val();
    searchRequest(searchPhrase);
  });

  var searchRequest = function(searchKey) {
    $.get('https://api.riffsy.com/v1/search?key=LIVDSRZULELA&tag=' + searchKey + '&limit=7', function(data) {
      $('.banners__content').html('');
      for (var i=0; i < data.results.length; i++) {
        $('.banners__content').append('<div class="banners__item"><img src=' +data.results[i].url +' height="308" width="620"></div>');
      }
    },'json');
  }
});
