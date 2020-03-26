'use strict';

$(document).ready(function() {

  testBtn.addEventListener("click", startTest);

  function startTest() {
    $('.info').slideUp("slow", function () {
      $('.test_form').slideDown( "slow" );
      testBtn.textContent = "Отправить на проверку";
      testBtn.removeEventListener("click", startTest);
      testBtn.addEventListener("click", showResults);
    });
  };

  function showResults() {
    $('.results_back').show();
    $('.results_message').show();
  };

  $('.message_button').click(function() {
    document.location.reload(true);
  });
});
