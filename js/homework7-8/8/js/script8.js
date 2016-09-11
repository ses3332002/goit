$(document).ready(function(){
  $("input").hover(
    function(){
      $("input:hover").next().show();
    },
    function(){
      $("input:hover").next().hide();
  });
  $(".helpButton").mousedown(function(){
    $(".helpButton").css({color: "white", background: "#4444c1"});
    $(".helpMessage").show();
  });  
  $(".helpButton").mouseup(function(){
    $(".helpButton").css({color: "", background: ""});
  });
});
