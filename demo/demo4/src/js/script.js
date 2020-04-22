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
          allMetaData = "";
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

  theme_btn.forEach(function(el,i) {
    el.style.setProperty("color", "hsl(" + (10 + i*120) + ", 85%, 64%)");
    el.style.setProperty("background-color", "hsl(" + (10 + i*120) + ", 40%, 10%)");
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
    doc.style.setProperty('--theme-color', 10 + elem*120);
  };

  function bgReset(elem) {
    doc.style.setProperty('--bg-color', 1 + elem*18 + "%");
  };

  // реакция на выбор фотографии
  var images = document.querySelectorAll("img");
  var fullscreenBack = document.createElement("div");
  var fullscreenImg = document.createElement("img");
  var currImg;
  fullscreenImg.classList.add("fullscreen_img");
  fullscreenBack.classList.add("fullscreen_back");

  images.forEach(function (el,i) {
    el.addEventListener("click", normalHandler);
  });

// реакция на клик в режиме плитки
  function normalHandler(e) {
    doc.append(fullscreenBack);
    doc.classList.add("no_scroll");
    fullscreenImg.setAttribute("src", e.target.src);
    currImg = e.target;
    fullscreenBack.append(fullscreenImg);
    // if (document.getElementById("question1").checked) {
      getExif(currImg);
    // };
    window.addEventListener("keydown", fsKeyHandler);
    fullscreenImg.addEventListener("dragstart", function (e) {
      e.preventDefault();
    });
    // fullscreenImg.addEventListener("click", fsClickHandler);
    fullscreenImg.addEventListener("mousedown", fsMouseHandler);
  };
  
  var firstX;
  var firstY;
  var lastX;
  var lastY;

  function fsMouseHandler(e) {
    firstX = e.clientX;
    firstY = e.clientY;
    fullscreenImg.addEventListener("mouseup", mouseUpHandler);
  };

  function mouseUpHandler(e) {
    // document.removeEventListener("mousemove", mouseMoveHandler);
    fullscreenImg.removeEventListener("mouseup", mouseUpHandler);
    lastX = e.clientX;
    lastY = e.clientY;
    if (lastX - firstX > 20) {
      nextImg();
      // block1.style.backgroundColor = "green";
    } else if (firstX - lastX > 20) {
      prevImg();
      // block1.style.backgroundColor = "red";
    } else if (firstX == lastX) {
      fsClickHandler();
    };
  };

  function fsClickHandler(e) {
    exifInfo.remove();
    fullscreenImg.classList.remove("fullscreen_img_fs");
    // fullscreenImg.removeEventListener("click", fsClickHandler);
    fullscreenImg.removeEventListener("mousedown", fsMouseHandler);
    fullscreenImg.remove();
    doc.classList.remove("no_scroll");
    fullscreenBack.remove();
    window.removeEventListener("keydown", fsKeyHandler);
  }

  function fsKeyHandler(e) {
    if (e.key == "Escape") {
      exifInfo.remove();
      fullscreenImg.classList.remove("fullscreen_img_fs");
      fullscreenImg.remove();
      doc.classList.remove("no_scroll");
      fullscreenBack.remove();
      window.removeEventListener("keydown", fsKeyHandler);
      fullscreenImg.removeEventListener("click", fsClickHandler);
    } else if (e.keyCode == 106) {
      fullscreenImg.classList.add("fullscreen_img_fs");
    } else if (e.keyCode == 111) {
      fullscreenImg.classList.remove("fullscreen_img_fs");
    } else if (e.key == "ArrowLeft" || e.key == "ArrowUp" || e.key == "PageUp") {
      // if (!currImg.previousElementSibling) {
      //   currImg = images[images.length - 1];
      // } else {
      //   currImg = currImg.previousElementSibling;
      // };
      // fullscreenImg.setAttribute("src", currImg.src);
      // getExif(currImg);
      prevImg();
    } else if (e.key == "ArrowRight" || e.key == "ArrowDown" || e.key == "PageDown") {
      // if (!currImg.nextElementSibling) {
      //   currImg = images[0];
      // } else {
      //   currImg = currImg.nextElementSibling;
      // };
      // fullscreenImg.setAttribute("src", currImg.src);
      // getExif(currImg);
      nextImg();
    };
  };
function nextImg() {
  if (!currImg.nextElementSibling) {
      currImg = images[0];
    } else {
        currImg = currImg.nextElementSibling;
      };
      fullscreenImg.setAttribute("src", currImg.src);
      getExif(currImg);
};

  function prevImg() {
    if (!currImg.previousElementSibling) {
        currImg = images[images.length - 1];
      } else {
          currImg = currImg.previousElementSibling;
        };
        fullscreenImg.setAttribute("src", currImg.src);
        getExif(currImg);

  }
}
