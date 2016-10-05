'use strict';

$(document).ready(function(){
  
  var searchPhrase;
  
  //отслеживаем нажатие Enter в поле поиска или кнопки Найти
  
  $('.searchField').keydown(function(eventObject) {
    if (eventObject.which==13) {
      searchPhrase=$('.searchField').val();
      searchRequest(searchPhrase);
    }
  })
  
  $('.searchButton').click(function() {
    searchPhrase=$('.searchField').val();
    searchRequest(searchPhrase);
  })

  //формируем поисковый запрос и выводим результаты
  
  var searchRequest = function(searchKey) {
    $.get('https://api.riffsy.com/v1/search?key=LIVDSRZULELA&tag=' + searchKey + '&limit=10', function(data) {
      $('.searchResults').html('');
      $('.searchResults').append('Результаты поиска:' + '<br/><br/>');
      for (var i=0; i < data.results.length; i++) {
        $('.searchResults').append('<img src=' +data.results[i].url +' height=150>'+ ' ' + data.results[i].title + '<br/>')
      }
    },'json');
  }

});