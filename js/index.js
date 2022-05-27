let sizeWidth = window.innerWidth;

if (sizeWidth <= 860) {
  document.querySelectorAll('.slider-desktop').forEach(e => e.classList.remove('slider'));
  document.querySelectorAll('.slider-mobile').forEach(e => e.classList.add('slider'));
}

let countSlider = document.querySelectorAll('.slider');
let rigthArrow = document.querySelectorAll('.arrow-right');
let leftArrow = document.querySelectorAll('.arrow-left');

let currentImage = [];
countSlider.forEach(() => {
  currentImage.push(0);
});

function hideImg(currentSlider) {
  for (let i = 0; i < currentSlider.length; i++) {
    currentSlider[i].classList.remove('show');
  }
}

function showImg(currentSlider, currentImage) {
  currentSlider[currentImage].classList.add('show');
}

rigthArrow.forEach((arrow, index) => {
  arrow.addEventListener('click', () => {
    let currentSlider = countSlider[index].children;
    let countImage = currentSlider.length - 1;

    currentImage[index]++;

    if (currentImage[index] > countImage) currentImage[index] = 0;

    hideImg(currentSlider);
    showImg(currentSlider, currentImage[index]);
  });
});

leftArrow.forEach((arrow, index) => {
  arrow.addEventListener('click', () => {
    let currentSlider = countSlider[index].children;
    let countImage = currentSlider.length - 1;

    currentImage[index]--;

    if (currentImage[index] < 0) currentImage[index] = countImage;

    hideImg(currentSlider);
    showImg(currentSlider, currentImage[index]);
  });
});
