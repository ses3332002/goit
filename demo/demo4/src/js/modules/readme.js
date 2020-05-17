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
