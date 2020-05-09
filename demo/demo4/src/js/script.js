"use strict";
window.onload = function () {

  // чтение данных EXIF
  var allMetaData;
  var exifInfo = document.createElement("div");
  exifInfo.classList.add("fs_exif_info");

  function getExif(el) {
    if (document.getElementById("question1").checked) {
      EXIF.getData(el, function() {
        if (Boolean(EXIF.getTag(this, "Make"))) {
          allMetaData = "Камера " + EXIF.getTag(this, "Make") + " " + EXIF.getTag(this, "Model") + ", дата и время " + EXIF.getTag(this, "DateTime") + ", ISO " + EXIF.getTag(this, "ISOSpeedRatings") + ", выдержка 1/" + Math.round(1 / EXIF.getTag(this, "ExposureTime")) + ", диафрагма " + EXIF.getTag(this, "FNumber");
        } else {
          allMetaData = "нет данных";
        };
        exifInfo.innerHTML = allMetaData;
        fullscreenBack.append(exifInfo);
      });
    };
  };

  // выбор темы и фона
  var theme_btn = document.querySelectorAll(".theme_selector__btn");
  var bg_btn = document.querySelectorAll(".bg_color_selector__btn");
  var doc = document.querySelector("body");
  var themes = [
  //   {
  //     // Color Palette #3663
  //   "color1": "#fefefe",
  //   "color2": "#710000",
  //   "color3": "#ffcf3f",
  //   "font": "theme1_font",
  //   "baseFontSize": "16"
  // },
    {
      // Color Palette #4209
    "color1": "#f6da73",
    "color2": "#3e5336",
    "color3": "#e55b7e",
    "font": "theme1_font",
    "baseFontSize": "16"
  },
    {
      // Color Palette #4197
    "color1": "#e4eaea",
    "color2": "#141a13",
    "color3": "#ae621f",
    "font": "theme2_font",
    "baseFontSize": "16"
  },
    {
      // Color Palette #3964
    "color1": "#f4f6ec",
    "color2": "#2d0c03",
    "color3": "#f8b786",
    "font": "theme3_font",
    "baseFontSize": "16"
  }];

  theme_btn.forEach(function(el,i) {
    // el.style.setProperty("color", "hsl(" + (10 + i*120) + ", 85%, 64%)");
    // el.style.setProperty("background-color", "hsl(" + (10 + i*120) + ", 40%, 10%)");
    el.style.setProperty("color", themes[i].color1);
    el.style.setProperty("background-color", themes[i].color2);
    el.style.setProperty("border-color", themes[i].color3);
    el.style.setProperty("font-family", themes[i].font);
    el.style.setProperty("font-size", (themes[i].baseFontSize - 1 ) + "px");
    el.addEventListener("click", function() {
      themeReset(i);
    });
  });

  bg_btn.forEach(function(el,i) {
    el.style.setProperty("background-color", "hsl(0, 0%, " + (1 + i*18) + "%)");
    el.addEventListener("click", function() {
      bgReset(i);
    });
  });

  function themeReset(elem) {
    doc.style.setProperty("--color", themes[elem].color1);
    doc.style.setProperty("--background_color", themes[elem].color2);
    doc.style.setProperty("--decor_color", themes[elem].color3);
    doc.style.setProperty("--font_family", themes[elem].font);
    doc.style.setProperty("--base_font_size", themes[elem].baseFontSize + "px");
    // el.style.setProperty("color", themes[i].color1);
    // el.style.setProperty("background-color", themes[i].color2);
    // el.style.setProperty("border-color", themes[i].color3);
  };

  function bgReset(elem) {
    doc.style.setProperty('--fs_bg_color', 1 + elem*18 + "%");
  };

  // реакция на выбор фотографии
  var images = document.querySelectorAll("img");
  var fullscreenBack = document.createElement("div");
  var fullscreenImg = document.createElement("img");
  var currImg;
  fullscreenImg.classList.add("fullscreen_img");
  fullscreenBack.classList.add("fullscreen_back");

  images.forEach(function (el,i) {
    el.addEventListener("click", galleryHandler);
  });

  //отключаем масштабирование сайта
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
    fullscreenImg.addEventListener("mousedown", fsMouseHandler);
    fullscreenImg.addEventListener("touchstart", fsTouchHandler);
    // fullscreenImg.addEventListener("wheel", wheelHandler);
    fullscreenBack.addEventListener("wheel", wheelHandler);
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
    }
  };

  // масштабирование прокруткой
  var scaleFactor = 1;
  var minScale = 0.5;
  var maxScale = 4;
  function zoomIn () {
    scaleFactor = scaleFactor + 0.1;
    if (scaleFactor > maxScale) {
      scaleFactor = maxScale;
    };
    if (scaleFactor > 1) {
      fullscreenBack.classList.add("fullscreen_back_fs");
    };
    fullscreenImg.style.transform = 'scale(' + scaleFactor + ')';
  };

  function zoomOut () {
    scaleFactor = scaleFactor - 0.1;
    if (scaleFactor < minScale) {
      scaleFactor = minScale;
    };
    if (scaleFactor < 1) {
      fullscreenBack.classList.remove("fullscreen_back_fs");
    };
    fullscreenImg.style.transform = 'scale(' + scaleFactor + ')';
  };

  function fsTouchHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    eventTouchToMouse = new Event("mousedown");
    eventTouchToMouse.clientX = e.targetTouches[0].clientX;
    fullscreenImg.dispatchEvent(eventTouchToMouse);
    fullscreenImg.addEventListener("touchend", touchEndHandler);

    function touchEndHandler(e) {
      e.preventDefault();
      e.stopPropagation();
      eventTouchToMouse = new Event("mouseup");
      eventTouchToMouse.clientX = e.changedTouches[0].clientX;
      fullscreenImg.dispatchEvent(eventTouchToMouse);
      fullscreenImg.removeEventListener("touchend", touchEndHandler);
    };
  };

  function fsMouseHandler(e) {
    firstX = e.clientX;
    firstY = e.clientY;
    fullscreenImg.addEventListener("mouseup", mouseUpHandler);

    function mouseUpHandler(e) {
      fullscreenImg.removeEventListener("mouseup", mouseUpHandler);
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
    // } else if (e.keyCode == 106) {
    //   fullscreenImg.classList.add("fullscreen_img_fs");
    //   fullscreenBack.classList.add("fullscreen_back_fs");
    //
    // } else if (e.keyCode == 111) {
    //   fullscreenImg.classList.remove("fullscreen_img_fs");
    //   fullscreenBack.classList.remove("fullscreen_back_fs");
    } else if (e.key == "ArrowLeft" || e.key == "ArrowUp" || e.key == "PageUp") {
      prevImg();
    } else if (e.key == "ArrowRight" || e.key == "ArrowDown" || e.key == "PageDown") {
      nextImg();
    };
  };

  function fullscreenEsc() {
    exifInfo.remove();
    fullscreenImg.classList.remove("fullscreen_img_fs");
    fullscreenImg.remove();
    doc.classList.remove("no_scroll");
    fullscreenBack.remove();
    fullscreenImg.removeEventListener("mousedown", fsMouseHandler);
    window.removeEventListener("keydown", fsKeyHandler);
    fullscreenImg.removeEventListener("touchstart", fsTouchHandler);
  };

  function normalScale() {
    scaleFactor = 1;
    fullscreenImg.style.transform = 'scale(1)';
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
      fullscreenImg.classList.remove("fullscreen_img-fade_to_right");
      fullscreenImg.setAttribute("src", currImg.src);
    }, 300);
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
      fullscreenImg.classList.remove("fullscreen_img-fade_to_left");
      fullscreenImg.setAttribute("src", currImg.src);
    }, 300);
    getExif(currImg);
  };

  // всплывающее окно с readme
  var readmeWindow = document.createElement("div");
  var readmeMessage = document.createElement("div");
  var readmeButton = document.createElement("button");

  readmeWindow.innerHTML = "Особенности сайта:";
  readmeWindow.classList.add("readme");
  readmeMessage.classList.add("readme__message");
  readmeButton.innerHTML = "Закрыть";
  readmeButton.classList.add("readme__button");

  fetch("readme.html")
  .then(response => response.text())
  .then(data => readmeMessage.innerHTML = data)
  .catch(console.error);
  doc.append(readmeWindow);
  readmeWindow.append(readmeMessage);
  readmeWindow.append(readmeButton);
  readmeButton.addEventListener("click", function () {
    readmeButton.remove();
    readmeMessage.remove();
    readmeWindow.remove();
  });
}
