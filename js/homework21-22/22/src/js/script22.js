'use strict';

$(document).ready(function(){

  //формирование вопросов и ответов для теста

  let questionList = [];

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

  questionList[3] = {
    questionText: 'Сколько будет 5+5?',
    questionOptions: ['10','11','12'],
    questionAnswer: '100'
  };

  //записываем вопросы в локальное хранилище

  localStorage.setItem('questions', JSON.stringify(questionList));

  //создание страницы и размещение вопросов теста

  let onPageQuestions = [];
  onPageQuestions = JSON.parse(localStorage.getItem('questions'));

  let newItem = $('#tmplt').html();
  let content = tmpl(newItem, {data: onPageQuestions});
  $('.form_content').append(content);

  //вызов отчета о результатах

  $('.submit_button').mousedown(function(){
    let res = calculateResults();
    $('.results_back').show();
    $('.message').text(`Вы правильно ответили на ${res} вопрос(a/ов) из ${onPageQuestions.length}`);
    $('.results_message').show();
  });

  //расчет результатов теста

  let calculateResults = function() {
    let rightAnswers = 0;
    for (let q of onPageQuestions) {
      if (checkQuestion(q)) {
        rightAnswers++;
      }
    }
    return rightAnswers;
  };

  //расчет результатов по конкретному вопросу

  let checkQuestion = function(question) {
    let rightMatrix = question.questionAnswer;
    let currentMatrix = '';
    let optionId;
    for (let o of question.questionOptions) {
      optionId = (onPageQuestions.indexOf(question)+1)*10 + (question.questionOptions.indexOf(o)+1);
      if ($('#' + optionId).prop('checked')) {
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

  //закрытие окна с результатами

  $('.message_button').click(function(){
    $('.results_message').hide();
    $('.results_back').hide();
    $('input:checked').prop('checked',false);
  });

});
