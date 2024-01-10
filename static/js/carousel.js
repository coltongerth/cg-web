const slidesContainer = document.getElementById("slides-container-fc");
const slide = document.querySelector(".slide-fc");
const prevButton = document.getElementById("slide-arrow-prev-fc");
const nextButton = document.getElementById("slide-arrow-next-fc");
nextButton.addEventListener("click", () => {
const slideWidth = slide.clientWidth;
slidesContainer.scrollLeft += slideWidth;
});
prevButton.addEventListener("click", () => {
const slideWidth = slide.clientWidth;
slidesContainer.scrollLeft -= slideWidth;
});

const slidesContainerHc = document.getElementById("slides-container-hc");
const slideHc = document.querySelector(".slide-hc");
const prevButtonHc = document.getElementById("slide-arrow-prev-hc");
const nextButtonHc = document.getElementById("slide-arrow-next-hc");
nextButtonHc.addEventListener("click", () => {
const slideWidthHc = slideHc.clientWidth;
slidesContainerHc.scrollLeft += slideWidthHc;
});
prevButtonHc.addEventListener("click", () => {
const slideWidthHc = slideHc.clientWidth;
slidesContainerHc.scrollLeft -= slideWidthHc;
});