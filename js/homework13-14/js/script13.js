'use strict;'

$(document).ready(function(){
  
  //формирование вопросов и ответов для теста

  var questionList = [];

  questionList[0] = {
    questionText: 'Сколько будет 2+2?',
    questionOptions: ['1','2','3','4'],
    questionAnswer: '0001'
  };

  questionList[1] = {
    questionText: 'Сколько будет 3+3?',
    questionOptions: ['4','5','6'],
    questionAnswer: '001'
  };

  questionList[2] = {
    questionText: 'Сколько будет 4+4?',
    questionOptions: ['7','8','9','10-2'],
    questionAnswer: '0101'
  };

  //записываем вопросы в локальное хранилище

  localStorage.setItem('q0', JSON.stringify(questionList[0]));
  localStorage.setItem('q1', JSON.stringify(questionList[1]));
  localStorage.setItem('q2', JSON.stringify(questionList[2]));

  //создание страницы и размещение вопросов теста

  var onPageQuestions = [];
  onPageQuestions[0] = JSON.parse(localStorage.getItem('q0'));
  onPageQuestions[1] = JSON.parse(localStorage.getItem('q1'));
  onPageQuestions[2] = JSON.parse(localStorage.getItem('q2'));

  var newItem = $('#tmplt').html();
  var content = tmpl(newItem, {data: onPageQuestions});
  $('.formContent').append(content);

  //вызов отчета о результатах
  
  $('.submitButton').mousedown(function(){
    var res = calculateResults();
    $('.resultsBack').show();
    $('.message').text('Вы правильно ответили на ' + res + ' вопрос(a/ов) из ' + onPageQuestions.length);
    $('.resultsMessage').show();
  });  
  
  //установка атрибутов чекбоксов
  
  $('.option input').click(function(){
    if(!$(this).attr('checked')) {
      $(this).attr('checked', true)
    } else {
      $(this).attr('checked', false)
    }
  });
  
  //расчет результатов теста
  
  calculateResults = function() {
    var rightAnswers = 0;
    for (var q=0; q < onPageQuestions.length; q++) {
      if (checkQuestion(q)) {
        rightAnswers++;
      }
    }
    return rightAnswers;
  };
  
  //расчет результатов по конкретному вопросу
  
  checkQuestion = function(numberOfQuestion) {
    var rightMatrix = onPageQuestions[numberOfQuestion].questionAnswer;
    var currentMatrix = '';
    var optionId;
    for (var o=0; o<onPageQuestions[numberOfQuestion].questionOptions.length; o++) {
      optionId = (numberOfQuestion+1)*10 + (o+1);
      if ($('#' + optionId).attr('checked')) {
        currentMatrix = currentMatrix + '1';
      } else {
        currentMatrix = currentMatrix + '0';
      }
    };
    if (parseInt(rightMatrix)==parseInt(currentMatrix)) {
      return true;
    } else {
      return false;
    }
  }
  
});

