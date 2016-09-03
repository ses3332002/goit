// управляющий объект
var timerObj = {
  isRunning: false,
  millisecs: 0
};

var h = 0, m = 0, s = 0, ms = 0;
var timeMark;
var countTime;

// отсчет времени
function getTime() {
  timeMark = new Date();
  if (timerObj.millisecs == 0) {
    timerObj.millisecs = +timeMark;
  } else {
    ms = ms + +timeMark - timerObj.millisecs;
    timerObj.millisecs = +timeMark;
    showNumbers();
  }
}

// реакция на нажатие кнопки старт-пауза
function startStopCount() {
  if (!timerObj.isRunning) {
    startBtn.style.background = "blue";
    startBtn.textContent = "Пауза";
    timerObj.isRunning = !timerObj.isRunning;
    countTime = setInterval(getTime, 7);
  } else {
    startBtn.style.background = "green";
    startBtn.textContent = "Продолжить";
    timerObj.isRunning = !timerObj.isRunning;
    timerObj.millisecs = 0;
    clearInterval(countTime);
  }
} 

// реакция на нажатие кнопки сброс
function resetCount() {
  clearInterval(countTime);
  timerObj.isRunning = false;
  timerObj.millisecs = 0;
  startBtn.style.background = "";
  startBtn.textContent = "Старт";
  h = 0, m = 0, s = 0, ms = 0;
  showNumbers();
} 

// прорисовка таймера
function showNumbers() {
  // проверка перехода на следующий круг
  if (ms > 999) {
    ms = ms - 1000;
    s++;
  };
  if (s > 59) {
    s = s - 60;
    m++;
  };
  if (m > 59) {
    m = m - 60;
    h++;
  };
  if (h > 99) {
    h = h - 100;
  };
  
  // проверка формата вывода    
  if (ms < 10) {
    mseconds.textContent = "00" + ms;
  } else if (ms > 10 && ms < 100) {
    mseconds.textContent = "0" + ms;  
  } else {
    mseconds.textContent = ms; 
  };
  if (s < 10) {
    seconds.textContent = "0" + s;
  } else {
    seconds.textContent = + s;
  };
  if (m < 10) {
    minutes.textContent = "0" + m;
  } else {
    minutes.textContent = m;
  };
  if (h < 10) {
    hours.textContent = "0" + h;
  } else {
    hours.textContent = h;
  };
}   

startBtn.addEventListener ("click", startStopCount);
resetBtn.addEventListener ("click", resetCount);
