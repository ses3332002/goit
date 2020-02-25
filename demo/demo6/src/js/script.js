'use strict';

$(document).ready(function() {
  var searchNumber = '';
  var searchPhoneNumber = '';

// подтверждение формы
  $('.tracking_request').on('submit', function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    searchNumber=$('.invoice_number').val();
    searchPhoneNumber=$('.phone_number').val();
    searchRequest(searchNumber, searchPhoneNumber);
  });
  

// запрос
  var searchRequest = function(searchKey1, searchKey2) {
    $.ajax({
      url: 'https://api.novaposhta.ua/v2.0/json/?',
      dataType: 'json',
      contentType: 'application/json',
      data: {
        'apiKey': apiKey,
        'modelName': 'TrackingDocument',
        'calledMethod': 'getStatusDocuments',
        'methodProperties': {
          'Documents': [{
            'DocumentNumber': searchKey1,
            'Phone': searchKey2
          }],
          'Language': 'RU'
        }
      },
      success: function(result) {
        $('.tracking-result__text-status').html('');
        $('.tracking-result__text-weight').html('');
        $('.tracking-result__text-route').html('');
        if (!(result.data[0].StatusCode==3)) {
          $('.tracking-result__text-status').html(result.data[0].Status);
          $('.tracking-result__text-weight').html(result.data[0].DocumentWeight);
          $('.tracking-result__text-route').html(result.data[0].CitySender + ' - ' + result.data[0].CityRecipient);
          } else {
          $('.tracking-result__text-status').html(result.data[0].Status);
        };
        $('.tracking_result').css({display: "block"});
      },
      type: 'post',
      dataType: 'jsonp'
    });
  };
});
