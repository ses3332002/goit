"use strict";
window.onload = function () {

  //= modules/exif.js

  //= modules/themes.js

  // реакция на выбор фотографии
  var images = document.querySelectorAll("img");
  var fullscreenBack = document.createElement("div");
  var fullscreenImg = document.createElement("img");
  var currImg; //ссылка на текущую фотку
  fullscreenImg.classList.add("fullscreen_img");
  fullscreenBack.classList.add("fullscreen_back");

  images.forEach(function (el,i) {
    el.addEventListener("click", galleryHandler);
  });

  //отключаем масштабирование сайта колесом мыши
  doc.addEventListener("wheel", function (e) {
    if (e.ctrlKey) {
      e.preventDefault();
      e.stopPropagation();
    };
  });

  // реакция на клик в режиме плитки
  function galleryHandler(e) {
    doc.append(fullscreenBack);
    doc.classList.add("no_scroll");
    fullscreenImg.setAttribute("src", e.target.src);
    currImg = e.target;
    fullscreenBack.append(fullscreenImg);
    getExif(currImg);
    window.addEventListener("keydown", fsKeyHandler);
    fullscreenImg.addEventListener("dragstart", function (e) {
      e.preventDefault();
    });
    fullscreenBack.addEventListener("mousedown", fsMouseHandler);
    fullscreenBack.addEventListener("wheel", wheelHandler);
    fullscreenImg.addEventListener("touchstart", fsTouchHandler);
    fullscreenImg.addEventListener("click", function (e) {
      e.preventDefault();
    });
  };

  var firstX;
  var firstY;
  var lastX;
  var lastY;
  var eventTouchToMouse;

  function wheelHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.ctrlKey) {
      if (e.deltaY > 0) {
        zoomIn();
      } else {
        zoomOut();
      };
    } else {
      if (e.deltaY > 0) {
        nextImg();
      } else {
        prevImg();
      };
    };
  };

  // масштабирование прокруткой
  var scaleFactor = 1;
  var minScale = 0.5;
  var maxScale = 4;

  function zoomIn() {
    scaleFactor = scaleFactor + 0.1;
    if (scaleFactor > maxScale) {
      scaleFactor = maxScale;
    };
    if (scaleFactor > 1) {
      fullscreenBack.classList.add("fullscreen_back_fs");
    };
    fullscreenImg.style.transform = "scale(" + scaleFactor + ")";
  };

  function zoomOut() {
    scaleFactor = scaleFactor - 0.1;
    if (scaleFactor < minScale) {
      scaleFactor = minScale;
    };
    if (scaleFactor < 1) {
      fullscreenBack.classList.remove("fullscreen_back_fs");
    };
    fullscreenImg.style.transform = "scale(" + scaleFactor + ")";
  };

  function fsTouchHandler(e) {
    var distanceSwipeStart;
    var distanceSwipeEnd;
    var swipeStart = 0;

    function distance (p1, p2) {
      return (Math.sqrt(Math.pow((p1.clientX - p2.clientX), 2) + Math.pow((p1.clientY - p2.clientY), 2)));
    };

    e.preventDefault();
    e.stopPropagation();
    if (e.targetTouches[1]) {
      swipeStart = 1;
      distanceSwipeStart = distance(e.targetTouches[0],e.targetTouches[1]);
      fullscreenImg.addEventListener('touchmove', touchMoveHandler);
    } else {
      eventTouchToMouse = new Event("mousedown");
      eventTouchToMouse.clientX = e.targetTouches[0].clientX;
      fullscreenBack.dispatchEvent(eventTouchToMouse);
      fullscreenImg.addEventListener("touchend", touchEndHandler);
    };

    function touchMoveHandler(e) {
      e.preventDefault();
      e.stopPropagation();
      // fullscreenImg.addEventListener("touchend", touchEndHandler);
      if (swipeStart) {
        distanceSwipeEnd = distance(e.targetTouches[0],e.targetTouches[1]);
        if (distanceSwipeStart > distanceSwipeEnd) {
          zoomOut();
        } else {
          zoomIn();
        };
      };
    };

    function touchEndHandler(e) {
      e.preventDefault();
      e.stopPropagation();

      eventTouchToMouse = new Event("mouseup");
      eventTouchToMouse.clientX = e.changedTouches[0].clientX;
      fullscreenBack.dispatchEvent(eventTouchToMouse);
      fullscreenImg.removeEventListener("touchend", touchEndHandler);
      fullscreenImg.removeEventListener("touchmove", touchMoveHandler);
    };
  };

  function fsMouseHandler(e) {
    firstX = e.clientX;
    firstY = e.clientY;
    //проверка работы с полосами прокрутки
    if ((firstX > fullscreenBack.clientWidth)||(firstY > fullscreenBack.clientHeight)) {
      return;
    };

    fullscreenBack.addEventListener("mouseup", mouseUpHandler);

    function mouseUpHandler(e) {
      fullscreenBack.removeEventListener("mouseup", mouseUpHandler);
      lastX = e.clientX;
      lastY = e.clientY;
      if (lastX - firstX > 20) {
        nextImg();
      } else if (firstX - lastX > 20) {
        prevImg();
      } else if ((firstX - lastX < 20)||(lastX - firstX < 20)) {
        fsClickHandler();
      };
    };
  };

  function fsClickHandler() {
    fullscreenEsc();
  };

  function fsKeyHandler(e) {
    if (e.key == "Escape") {
      fullscreenEsc();
    } else if (e.keyCode == 107) {
      zoomIn();
    } else if (e.keyCode == 109) {
      zoomOut();
    } else if (e.key == "ArrowLeft" || e.key == "ArrowUp" || e.key == "PageUp") {
      prevImg();
    } else if (e.key == "ArrowRight" || e.key == "ArrowDown" || e.key == "PageDown") {
      nextImg();
    };
  };

  function fullscreenEsc() {
    normalScale();
    exifInfo.remove();
    fullscreenImg.classList.remove("fullscreen_img_fs");
    fullscreenImg.remove();
    doc.classList.remove("no_scroll");
    fullscreenBack.removeEventListener("mousedown", fsMouseHandler);
    fullscreenBack.remove();
    window.removeEventListener("keydown", fsKeyHandler);
    fullscreenImg.removeEventListener("touchstart", fsTouchHandler);
  };

  function normalScale() {
    scaleFactor = 1;
    fullscreenImg.style.transform = "scale(1)";
    fullscreenBack.classList.remove("fullscreen_back_fs");
  };

  function nextImg() {
    normalScale();
    if (!currImg.nextElementSibling) {
      currImg = images[0];
      } else {
      currImg = currImg.nextElementSibling;
    };
    fullscreenImg.classList.add("fullscreen_img-fade_to_right");
    setTimeout(function () {
      fullscreenImg.classList.add("fullscreen_img-appear");
      fullscreenImg.classList.remove("fullscreen_img-fade_to_right");
      fullscreenImg.setAttribute("src", currImg.src);
      }, 300);
    setTimeout(function () {
      fullscreenImg.classList.remove("fullscreen_img-appear");
    }, 500);
    getExif(currImg);
  };

  function prevImg() {
    normalScale();
    if (!currImg.previousElementSibling) {
      currImg = images[images.length - 1];
      } else {
      currImg = currImg.previousElementSibling;
    };
    fullscreenImg.classList.add("fullscreen_img-fade_to_left");
    setTimeout(function () {
      fullscreenImg.classList.add("fullscreen_img-appear");
      fullscreenImg.classList.remove("fullscreen_img-fade_to_left");
      fullscreenImg.setAttribute("src", currImg.src);
    }, 300);
    setTimeout(function () {
      fullscreenImg.classList.remove("fullscreen_img-appear");
    }, 500);
    getExif(currImg);
  };

  //= modules/readme.js
}
