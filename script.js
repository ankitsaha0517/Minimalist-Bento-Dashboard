function openCloseWidget() {
  let cards = document.querySelectorAll(".widget-card");
  let fullModels = document.querySelectorAll(".fullscreen-models");
  let closebtn = document.querySelectorAll(".close-btn");

  cards.forEach((elem) => {
    elem.addEventListener("click", () => {
      fullModels[elem.id].style.display = "block";
    });
  });

  closebtn.forEach((elem, index) => {
    elem.addEventListener("click", () => {
      fullModels[index].style.display = "none";
    });
  });
}
openCloseWidget()