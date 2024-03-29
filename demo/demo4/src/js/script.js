'use strict';

const doc = document.body;
const themeBtns = document.querySelectorAll('.theme_selector__btn');
const bgBtns = document.querySelectorAll('.bg_color_selector__lbl');
const images = document.querySelectorAll('picture');
const themes = [
  {
    // Color Palette #4209
    color1: '#f6da73',
    color2: '#3e5336',
    color3: '#e55b7e',
    font: 'theme1_font',
    baseFontSize: '16',
  },
  {
    // Color Palette #4197
    color1: '#e4eaea',
    color2: '#141a13',
    color3: '#ae621f',
    font: 'theme2_font',
    baseFontSize: '16',
  },
  {
    // Color Palette #3964
    color1: '#f4f6ec',
    color2: '#2d0c03',
    color3: '#f8b786',
    font: 'theme3_font',
    baseFontSize: '16',
  },
];

themeBtns.forEach((el, i) => {
  el.style.setProperty('color', themes[i].color1);
  el.style.setProperty('background-color', themes[i].color2);
  el.style.setProperty('border-color', themes[i].color3);
  el.style.setProperty('font-family', themes[i].font);
  el.style.setProperty('font-size', `${themes[i].baseFontSize - 1}px`);
  el.addEventListener('click', () => themeReset(i));
});

function themeReset(index) {
  doc.style.setProperty('--color', themes[index].color1);
  doc.style.setProperty('--background_color', themes[index].color2);
  doc.style.setProperty('--decor_color', themes[index].color3);
  doc.style.setProperty('--font_family', themes[index].font);
  doc.style.setProperty('--base_font_size', `${themes[index].baseFontSize}px`);
}

bgBtns.forEach((el, i) => {
  el.style.setProperty(
    'background-color',
    `hsl(0, 0%, ${1 + el.previousElementSibling.value * 18}%)`
  );
});

document.forms.bgSelect.addEventListener('input', bgReset);

function bgReset(e) {
  doc.style.setProperty('--fs_bg_color', `${1 + e.target.value * 18}%`);
}

let showEXIF = false;
document.getElementById('exif_option').addEventListener('change', EXIFCheckboxHandler);

function EXIFCheckboxHandler(e) {
  e.target.checked ? (showEXIF = true) : (showEXIF = false);
}

let currImg;

let fullscreenBack = document.createElement('div');
let fullscreenImg = document.createElement('img');

function fullscreenIn() {
  fullscreenBack.classList.add('fullscreen_back');
  doc.classList.add('no_scroll');
  doc.append(fullscreenBack);
  fullscreenBack.addEventListener('mousedown', fsMouseHandler);
  fullscreenBack.addEventListener('wheel', wheelHandler);
  window.addEventListener('keydown', fsKeyHandler);
}

images.forEach((el, i) => {
  el.addEventListener('click', galleryClickHandler);
  el.childNodes[5].addEventListener('focus', galleryFocusHandler);
});

function galleryFocusHandler(e) {
  let eventKeyOnPhoto;
  e.target.addEventListener('keydown', galleryKeyHandler);

  function galleryKeyHandler(e) {
    if (e.keyCode == 32 || e.key == 'Enter') {
      eventKeyOnPhoto = new Event('click');
      e.target.removeEventListener('keydown', galleryKeyHandler);
      e.target.parentElement.dispatchEvent(eventKeyOnPhoto);
    }
  }
}

doc.addEventListener('wheel', (e) => {
  if (e.ctrlKey) {
    e.preventDefault();
    e.stopPropagation();
  }
});

function galleryClickHandler(e) {
  if (e.currentTarget.tagName !== 'PICTURE') {
    return;
  }
  currImg = e.currentTarget;
  fullscreenIn();
  showImage(currImg);
}

let firstX;
let firstY;
let lastX;
let lastY;
let eventTouchToMouse;

function wheelHandler(e) {
  e.preventDefault();
  e.stopPropagation();
  if (e.ctrlKey) {
    if (e.deltaY > 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  } else {
    if (e.deltaY > 0) {
      nextImg();
    } else {
      prevImg();
    }
  }
}

let scaleFactor = 1;
const minScale = 0.5;
const maxScale = 4;

function zoomIn() {
  scaleFactor = scaleFactor + 0.1;
  if (scaleFactor > maxScale) {
    scaleFactor = maxScale;
  }
  if (scaleFactor > 1) {
    fullscreenBack.classList.add('fullscreen_back_fs');
    fullscreenImg.classList.add('fullscreen_img-zoom');
  }
  fullscreenImg.style.transform = `scale(${scaleFactor})`;
}

function zoomOut() {
  scaleFactor = scaleFactor - 0.1;
  if (scaleFactor < minScale) {
    scaleFactor = minScale;
  }
  if (scaleFactor < 1) {
    fullscreenBack.classList.remove('fullscreen_back_fs');
    fullscreenImg.classList.remove('fullscreen_img-zoom');
  }
  fullscreenImg.style.transform = `scale(${scaleFactor})`;
}

function fsTouchHandler(e) {
  let distanceSwipeStart;
  let distanceSwipeEnd;

  e.preventDefault();
  e.stopPropagation();
  eventTouchToMouse = new Event('mousedown');
  eventTouchToMouse.clientX = e.targetTouches[0].clientX;
  fullscreenBack.dispatchEvent(eventTouchToMouse);
  fullscreenImg.addEventListener('touchend', touchEndHandler);

  function touchMoveHandler(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function touchEndHandler(e) {
    e.preventDefault();
    e.stopPropagation();

    eventTouchToMouse = new Event('mouseup');
    eventTouchToMouse.clientX = e.changedTouches[0].clientX;
    fullscreenBack.dispatchEvent(eventTouchToMouse);
    fullscreenImg.removeEventListener('touchend', touchEndHandler);
    fullscreenImg.removeEventListener('touchmove', touchMoveHandler);
  }
}

function fsMouseHandler(e) {
  firstX = e.clientX;
  firstY = e.clientY;
  if (firstX > fullscreenBack.clientWidth || firstY > fullscreenBack.clientHeight) {
    return;
  }

  fullscreenBack.addEventListener('mouseup', mouseUpHandler);

  function mouseUpHandler(e) {
    fullscreenBack.removeEventListener('mouseup', mouseUpHandler);
    lastX = e.clientX;
    lastY = e.clientY;
    if (lastX - firstX > 20) {
      nextImg();
    } else if (firstX - lastX > 20) {
      prevImg();
    } else if (firstX - lastX < 20 || lastX - firstX < 20) {
      fullscreenEsc();
    }
  }
}

function fsKeyHandler(e) {
  if (e.key == 'Escape') {
    fullscreenEsc();
  } else if (e.keyCode == 107) {
    zoomIn();
  } else if (e.keyCode == 109) {
    zoomOut();
  } else if (e.key == 'ArrowLeft' || e.key == 'ArrowUp' || e.key == 'PageUp') {
    prevImg();
  } else if (e.key == 'ArrowRight' || e.key == 'ArrowDown' || e.key == 'PageDown') {
    nextImg();
  }
}

function fullscreenEsc() {
  normalScale();
  hideImage();
  fullscreenOut();
}

function fullscreenOut() {
  fullscreenBack.classList.remove('fullscreen_back');
  doc.classList.remove('no_scroll');
  fullscreenBack.removeEventListener('mousedown', fsMouseHandler);
  fullscreenBack.removeEventListener('wheel', wheelHandler);
  window.removeEventListener('keydown', fsKeyHandler);
  fullscreenBack.remove();
}

function normalScale() {
  scaleFactor = 1;
  fullscreenImg.style.transform = 'scale(1)';
  fullscreenBack.classList.remove('fullscreen_back_fs');
  fullscreenImg.classList.remove('fullscreen_img-zoom');
}

function nextImg() {
  normalScale();
  if (!currImg.nextElementSibling) {
    currImg = images[0];
  } else {
    currImg = currImg.nextElementSibling;
  }
  fullscreenImg.setAttribute('src', '');
  fullscreenImg.remove();
  setTimeout(() => {
    showImage(currImg);
  }, 60);
}

function prevImg() {
  normalScale();
  if (!currImg.previousElementSibling) {
    currImg = images[images.length - 1];
  } else {
    currImg = currImg.previousElementSibling;
  }
  fullscreenImg.setAttribute('src', '');
  fullscreenImg.remove();
  setTimeout(() => {
    showImage(currImg);
  }, 60);
}

function showImage(elem) {
  fullscreenImg.classList.add('fullscreen_img');
  fullscreenImg.setAttribute(
    'src',
    elem.childNodes[5].currentSrc.replace('build/img', 'build/img/fullsize')
  );
  fullscreenBack.append(fullscreenImg);
  fullscreenImg.addEventListener('dragstart', (e) => {
    e.preventDefault();
  });

  fullscreenImg.addEventListener('touchstart', fsTouchHandler);
  fullscreenImg.addEventListener('click', (e) => {
    e.preventDefault();
  });
  if (showEXIF) {
    getExif(elem.childNodes[5]);
  }
}

function hideImage() {
  fullscreenImg.classList.remove('fullscreen_img');
  fullscreenImg.removeEventListener('touchstart', fsTouchHandler);
  if (showEXIF) {
    exifInfo.remove();
  }
  fullscreenImg.setAttribute('src', '');
  fullscreenImg.remove();
}

let exifInfo = document.createElement('div');
exifInfo.classList.add('fs_exif_info');

function getExif(el) {
  let allMetaData;
  EXIF.getData(el, function () {
    if (Boolean(EXIF.getTag(this, 'Make'))) {
      allMetaData = `Камера ${EXIF.getTag(this, 'Make')} ${EXIF.getTag(
        this,
        'Model'
      )}, дата и время: ${EXIF.getTag(this, 'DateTime')}, ISO ${EXIF.getTag(
        this,
        'ISOSpeedRatings'
      )}, выдержка 1/${Math.round(1 / EXIF.getTag(this, 'ExposureTime'))}, диафрагма 
${EXIF.getTag(this, 'FNumber')}`;
    } else {
      allMetaData = 'нет данных';
    }
    exifInfo.innerHTML = allMetaData;
    fullscreenBack.append(exifInfo);
  });
}
