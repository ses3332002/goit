"use strict";
window.onload = function () {

  // чтение данных EXIF
  var allMetaData;
  var exifInfo = document.createElement("div");
  exifInfo.classList.add("fs_exif_info");
  function getExif(el) {
    if (document.getElementById("question1").checked) {
      EXIF.getData(el, function() {
        allMetaData = "Камера " + EXIF.getTag(this, "Make") + " " + EXIF.getTag(this, "Model") + ", дата и время " + EXIF.getTag(this, "DateTime") + ", ISO " + EXIF.getTag(this, "ISOSpeedRatings") + ", выдержка 1/" + Math.round(1 / EXIF.getTag(this, "ExposureTime")) + ", диафрагма " + EXIF.getTag(this, "FNumber");
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

  function normalHandler(e) {
    doc.append(fullscreenBack);
    doc.classList.add("no_scroll");
    fullscreenImg.setAttribute("src", e.target.src);
    currImg = e.target;
    fullscreenBack.append(fullscreenImg);
    getExif(currImg);
    window.addEventListener("keydown", fsKeyHandler);
  };

  function fsKeyHandler(e) {
    if (e.key == "Escape") {
      exifInfo.remove();
      fullscreenImg.remove();
      doc.classList.remove("no_scroll");
      fullscreenBack.remove();
      window.removeEventListener("keydown", fsKeyHandler);
    } else if (e.key == "ArrowLeft" || e.key == "ArrowUp" || e.key == "PageUp") {
      if (!currImg.previousElementSibling) {
        currImg = images[images.length - 1];
      } else {
        currImg = currImg.previousElementSibling;
      };
      fullscreenImg.setAttribute("src", currImg.src);
      getExif(currImg);
    } else if (e.key == "ArrowRight" || e.key == "ArrowDown" || e.key == "PageDown") {
      if (!currImg.nextElementSibling) {
        currImg = images[0];
      } else {
        currImg = currImg.nextElementSibling;
      };
      fullscreenImg.setAttribute("src", currImg.src);
      getExif(currImg);
    };
  };

}
