$(document).ready(function(){
  $(".niceCheck").mousedown(
    function() {
      changeCheck($(this));
    });

  $(".niceCheckSpan").each(
    function() {
      changeCheckStart($(this));
    });
});

function changeCheck(el)
{
  var el = el.find(".niceCheckSpan").eq(0);
  input = el.find("input").eq(0);
  if(!input.attr("disabled")) {
    if(!input.attr("checked")) {
    el.css("background-position","0 -17px");    
    input.attr("checked", true)
    } else {
    el.css("background-position","0 0");    
    input.attr("checked", false)
    }
  }
return true;
}

function changeCheckStart(el)
{
  var el = el,
  input = el.find("input").eq(0);
  if(input.attr("checked")) {
    el.css("background-position","0 -17px");    
  };
  if(input.attr("disabled")) {
    el.css("background-position","0 -34px");    
  };
return true;
}