'use strict';

$(document).ready(function() {

  testBtn.addEventListener("click", startTest);

  function startTest() {
    $('.info').slideUp("slow", function () {
      $('.test_form').slideDown("slow");
      testBtn.textContent = "Отправить тест на проверку";
      testBtn.removeEventListener("click", startTest);
      testBtn.addEventListener("click", showResults);
    });
  };

  function showResults() {
    $('.results_back').show();
    $('.results_message').show("slow");
  };

  $('.message_button').click(function() {
    $('input:checked').prop('checked',false);
    document.location.reload(false);
  });
});
