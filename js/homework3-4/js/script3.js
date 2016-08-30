//объект
var testPage = {
  name: "Testpage"
};

//методы
testPage.createTestPage = function(numOfQuestions, numOfOptions) {
  document.body.style.fontFamily = "Arial";
  document.body.style.marginLeft = "20%";
  document.body.style.marginRight = "20%";
  var testForm = document.createElement("form");
  testForm.setAttribute("action","");
  document.body.appendChild(testForm);
  var header = document.createElement("div");
  header.innerHTML = "<h3>Тест по программированию</h3>";
  header.style.textAlign = "center";
  testForm.appendChild(header);
  
  //цикл по вопросам
  var question;
  for (var q = 1; q < numOfQuestions+1; q++) {
    question = document.createElement("div");
    question.innerHTML = "<h4>" + q + ". Вопрос №" + q + "</h4>";
    testForm.appendChild(question);

    //цикл по вариантам ответов
    var optionDiv;
    var optionLabel;
    var optionInput;
    for (var o = 1; o < numOfOptions+1; o++) {
      optionDiv = document.createElement("div");
      optionLabel = document.createElement("label");
      optionInput = document.createElement("input");
      optionInput.setAttribute("type", "checkbox");
      optionInput.setAttribute("id", q + (o + ""));
      optionInput.setAttribute("name", "Вопрос №" + q);
      optionInput.setAttribute("value", "Вариант ответа №" + o);
      optionLabel.innerHTML = "Вариант ответа №" + o;
      optionLabel.setAttribute("for", q + (o + ""));
      optionLabel.style.cursor = "pointer";
      question.appendChild(optionDiv);
      optionDiv.appendChild(optionInput);
      optionDiv.appendChild(optionLabel);
    }
  };

  var commitButton = document.createElement("div");
  commitButton.style.marginTop = "40px";
  commitButton.style.textAlign = "center";
  testForm.appendChild(commitButton);
  
  var commitInput = document.createElement("input");
  commitInput.setAttribute("type", "submit");
  commitInput.setAttribute("value", "Проверить мои ответы");
  commitInput.style.width = "330px";
  commitInput.style.height = "40px";
  commitInput.style.border = "2px solid black";
  commitInput.style.background = "#cfe1f5";
  commitInput.style.fontSize = "14px";
  commitInput.style.cursor = "pointer";
  commitButton.appendChild(commitInput);
};

testPage.createTestPage(3,3);