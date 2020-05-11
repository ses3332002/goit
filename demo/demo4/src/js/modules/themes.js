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
};

function bgReset(elem) {
  doc.style.setProperty('--fs_bg_color', 1 + elem*18 + "%");
};
