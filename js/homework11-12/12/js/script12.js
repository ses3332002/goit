$(document).ready(function(){
  var newItem = $("#tmplt").html();
  var action_stars = [
    {
      name: "Брюс",
      lastName: "Ли",
      state: "Гонконг",
      birth: "1940",
      death: "1973"
    },
    {
      name: "Саммо",
      lastName: "Хун",
      state: "Гонконг",
      birth: "1952",
      death: "-"
    },
    {
      name: "Джеки",
      lastName: "Чан",
      state: "Гонконг",
      birth: "1954",
      death: "-"
    },
    {
      name: "Джет",
      lastName: "Ли",
      state: "Китай",
      birth: "1963",
      death: "-"
    }
  ];
  var content = tmpl(newItem, {data: action_stars});
  
  $(".wrapper").append(content);
  
});
