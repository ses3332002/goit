// чтение данных EXIF
var allMetaData;
var exifInfo = document.createElement("div");
exifInfo.classList.add("fs_exif_info");

function getExif(el) {
  if (document.getElementById("exif_question").checked) {
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
