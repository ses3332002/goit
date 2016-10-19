'use strict';

$(document).ready(function () {

  //формирование вопросов и ответов для теста

  var questionList = [];

  questionList[0] = {
    questionText: 'Сколько будет 2+2?',
    questionOptions: ['1', '2', '3', '4'],
    questionAnswer: '0001'
  };

  questionList[1] = {
    questionText: 'Сколько будет 3+3?',
    questionOptions: ['4', '5', '6'],
    questionAnswer: '001'
  };

  questionList[2] = {
    questionText: 'Сколько будет 4+4?',
    questionOptions: ['7', '8', '9', '10-2'],
    questionAnswer: '0101'
  };

  questionList[3] = {
    questionText: 'Сколько будет 5+5?',
    questionOptions: ['10', '11', '12'],
    questionAnswer: '100'
  };

  //записываем вопросы в локальное хранилище

  localStorage.setItem('questions', JSON.stringify(questionList));

  //создание страницы и размещение вопросов теста

  var onPageQuestions = [];
  onPageQuestions = JSON.parse(localStorage.getItem('questions'));

  var newItem = $('#tmplt').html();
  var content = tmpl(newItem, { data: onPageQuestions });
  $('.form_content').append(content);

  //вызов отчета о результатах

  $('.submit_button').mousedown(function () {
    var res = calculateResults();
    $('.results_back').show();
    $('.message').text('\u0412\u044B \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E \u043E\u0442\u0432\u0435\u0442\u0438\u043B\u0438 \u043D\u0430 ' + res + ' \u0432\u043E\u043F\u0440\u043E\u0441(a/\u043E\u0432) \u0438\u0437 ' + onPageQuestions.length);
    $('.results_message').show();
  });

  //расчет результатов теста

  var calculateResults = function calculateResults() {
    var rightAnswers = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = onPageQuestions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var q = _step.value;

        if (checkQuestion(q)) {
          rightAnswers++;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return rightAnswers;
  };

  //расчет результатов по конкретному вопросу

  var checkQuestion = function checkQuestion(question) {
    var rightMatrix = question.questionAnswer;
    var currentMatrix = '';
    var optionId = void 0;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = question.questionOptions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var o = _step2.value;

        optionId = (onPageQuestions.indexOf(question) + 1) * 10 + (question.questionOptions.indexOf(o) + 1);
        if ($('#' + optionId).prop('checked')) {
          currentMatrix = currentMatrix + '1';
        } else {
          currentMatrix = currentMatrix + '0';
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    ;
    if (parseInt(rightMatrix) == parseInt(currentMatrix)) {
      return true;
    } else {
      return false;
    }
  };

  //закрытие окна с результатами

  $('.message_button').click(function () {
    $('.results_message').hide();
    $('.results_back').hide();
    $('input:checked').prop('checked', false);
  });
});