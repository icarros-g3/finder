/********** SLIDER IMAGE **********/
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

/********** SLIDER WRAPPER **********/
let sizeWindow = window.screen.width;

// controles wrapper
let arrowWrapper = document.querySelectorAll('.arrow-indicator-wrapper');

// elementos wrapper
let card = document.querySelectorAll('.wrapper-slider .card');
let cardPerPage = Math.ceil(card.length / 3);

// deslocamento de elementos
let lengthMove = 0;
let movePer = 101.55;
let maxMove = 204;

// Responsividade
if (sizeWindow <= 1110) {
  cardPerPage = Math.ceil(card.length / 5);
  // movePer = 50.36;
  // maxMove = 504;
}

if (sizeWindow <= 710) {
  cardPerPage = Math.ceil(card.length / 12);
  // movePer = 50.36;
  // maxMove = 504;
}

// inicializador dos bullets
let countBullets = Math.ceil(card.length / cardPerPage);
let bulletContainer = document.querySelector('.wrapper-container .bullet-container');

initializeBullets();
function initializeBullets() {
  for (let i = 0; i < countBullets; i++) {
    let span = document.createElement('span');
    if (i == 0) {
      span.classList.add('active');
    }
    bulletContainer.appendChild(span);
  }
}

let bullets = document.querySelectorAll('.bullet-container span');
let currentBullet = 0;

function rightMove() {
  lengthMove = lengthMove + movePer;
  if (card == 1) {
    lengthMove = 0;
  }
  for (const i of card) {
    if (lengthMove > maxMove) {
      lengthMove = lengthMove - movePer;
    }
    i.style.left = '-' + lengthMove + '%';
  }
}

function leftMove() {
  lengthMove = lengthMove - movePer;
  if (lengthMove <= 0) {
    lengthMove = 0;
  }
  for (const i of card) {
    if (cardPerPage > 1) {
      i.style.left = '-' + lengthMove + '%';
    }
  }
}

function hideBullet() {
  bullets.forEach(bullet => {
    bullet.classList.remove('active');
  });
}

function showBullet() {
  bullets[currentBullet].classList.add('active');
}

function controlArrowsClick() {
  if (!arrowWrapper.length) return;

  arrowWrapper[1].onclick = () => {
    rightMove();
    currentBullet++;

    if (currentBullet < bullets.length) {
      hideBullet();
      showBullet();
    } else {
      currentBullet = bullets.length - 1;
    }
  };
  arrowWrapper[0].onclick = () => {
    leftMove();
    currentBullet--;

    if (currentBullet >= 0) {
      hideBullet();
      showBullet();
    } else {
      currentBullet = 0;
    }
  };
}
this.controlArrowsClick();

bullets.forEach((bullet, index) => {
  bullet.addEventListener('click', () => {
    if (index < currentBullet) {
      leftMove();
    } else if (index > currentBullet) {
      rightMove();
    }

    currentBullet = index;
    hideBullet();
    showBullet();
  });
});

/********** SEARCHBAR SUBMIT HANDLER **********/
const searchbarForm = document.getElementById('searchbar-form');
function handleSearchbarSubmit() {
  if (!searchbarForm) return;

  searchbarForm.addEventListener('submit', event => {
    event.preventDefault();
  });
}
this.handleSearchbarSubmit();

/********** HEADER - NAVBAR **********/
const menuIcon = document.getElementById('menuIcon');
const mainNav = document.getElementById('desktopNav');
const mobileNav = document.getElementById('mobileNav');
const mainHeader = document.getElementById('mainHeader');

function handleMobileMenuState() {
  if (!menuIcon) return;

  menuIcon.onclick = e => {
    // e.stopPropagation();
    // e.preventDefault();

    const ariaChecked = menuIcon.getAttribute('aria-checked');
    if (ariaChecked === 'true') {
      menuIcon.classList.remove('triggered');
      menuIcon.setAttribute('aria-checked', 'false');
      // document.querySelector('.logo-container').style.position = 'static';
      // document.querySelector('.logo-container').style.left = '0';

      mobileNav.classList.remove('overlay');
    } else {
      menuIcon.classList.add('triggered');
      // document.querySelector('.logo-container').style.position = 'fixed';
      // document.querySelector('.logo-container').style.left = '24px';

      menuIcon.setAttribute('aria-checked', 'true');
      mobileNav.classList.add('overlay');
    }
  };
}
handleMobileMenuState();

function handleMobileMenuScrollBehavior() {
  let prevScrollpos = window.scrollY;

  window.onscroll = () => {
    let currentScrollPos = window.scrollY;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById('mainHeader').style.top = '0';
    } else {
      if (currentScrollPos > 40 && !menuIcon.classList.contains('triggered')) {
        document.getElementById('mainHeader').style.top = '-80px';
      }
    }
    prevScrollpos = currentScrollPos;
  };
}
handleMobileMenuScrollBehavior();

function handleEmailSubscribeField() {
  const subscribe = document.getElementById('subscribe');

  if (!subscribe) return;

  subscribe.onclick = e => {
    return;
  };
}
handleEmailSubscribeField();
