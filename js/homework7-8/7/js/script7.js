$(document).ready(function(){
  $(".tab").on("click", function (){
    var n = 0;
    if ($(this).hasClass("nonSelected")) {
      $(".selected").toggleClass("selected nonSelected");
      $(this).toggleClass("selected nonSelected");
      $(".tab_content").hide();
      n = $(".tab").index($(".selected"));
      $(".tab_content").slice(n,n + 1).show();
    };
  });
});
