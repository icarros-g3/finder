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

/********** CATALOG - FILTERS **********/
const BASE_URL = 'https://e-carros-api.herokuapp.com';
const brands = [];
const colors = [];
const fuels = [];
const mileages = [];
const conditions = [];
const types = [];
const transmissions = [];
const additionals = [];
const adverts = [];

function getBrands() {
  fetch(`${BASE_URL}/brands`)
    .then(response => response.json())
    .then(resp => brands.push(...resp))
    // .then(() => console.log(brands))
    .then(() => {
      const brandsSearchbarField = document.getElementById('brand');
      if (brandsSearchbarField) {
        brandsSearchbarField.innerHTML = `
        <option value="" selected>Marca</option>
        ${brands
          .map(
            brand => `
          <option value=${brand.name}>${brand.name}</option>
        `,
          )
          .join('')}`;
      }
    });
}
getBrands();

function getColors() {
  fetch(`${BASE_URL}/colors`)
    .then(response => response.json())
    .then(resp => colors.push(...resp));
  // .then(() => console.log(colors));
}
getColors();

function getFuel() {
  fetch(`${BASE_URL}/fuel`)
    .then(response => response.json())
    .then(resp => fuels.push(...resp));
  // .then(() => console.log(fuels));
}
getFuel();

function getMileage() {
  fetch(`${BASE_URL}/mileage`)
    .then(response => response.json())
    .then(resp => mileages.push(...resp))
    // .then(() => console.log(mileages))
    .then(() => {
      const mileagesSearchbarField = document.getElementById('mileage');
      if (mileagesSearchbarField) {
        mileagesSearchbarField.innerHTML = `
        <option value="" selected>Todas</option>
        ${mileages
          .map(
            mileage => `
          <option value=${mileage}>${mileage}</option>
        `,
          )
          .join('')}`;
      }
    });
}
getMileage();

function getCondition() {
  fetch(`${BASE_URL}/condition`)
    .then(response => response.json())
    .then(resp => conditions.push(...resp));
  // .then(() => console.log(conditions));
}
getCondition();

function getType() {
  fetch(`${BASE_URL}/cartype`)
    .then(response => response.json())
    .then(resp => types.push(...resp))
    // .then(() => console.log(types))
    .then(() => {
      const typesSearchbarField = document.getElementById('type');
      if (typesSearchbarField) {
        typesSearchbarField.innerHTML = `
        <option value="" selected>Tipo</option>
        ${types
          .map(
            type => `
          <option value=${type}>${type}</option>
        `,
          )
          .join('')}`;
      }
    });
}
getType();

function getTransmission() {
  fetch(`${BASE_URL}/transmission`)
    .then(response => response.json())
    .then(resp => transmissions.push(...resp));
  // .then(() => console.log(transmissions));
}
getTransmission();

function getAdditional() {
  fetch(`${BASE_URL}/additional`)
    .then(response => response.json())
    .then(resp => additionals.push(...resp));
  // .then(() => console.log(additionals));
}
getAdditional();

function getAdverts() {
  fetch(`${BASE_URL}/adverts`)
    .then(response => response.json())
    .then(resp => adverts.push(...resp));
  // .then(() => console.log(adverts));
}
getAdverts();

/********** SEARCHBAR SUBMIT HANDLER **********/
const searchbarForm = document.getElementById('searchbar-form');
function handleSearchbarSubmit() {
  if (!searchbarForm) return;

  searchbarForm.addEventListener('submit', event => {
    event.preventDefault();
    // console.warn(event);
  });
}
this.handleSearchbarSubmit();

/********** CATALOG - LIST **********/
const catalogList = document.getElementById('catalog-list');
const cards = document.querySelectorAll('#catalog-list .card');
const showInlineCatalogList = document.getElementById('show-inline');
const showColumnCatalogList = document.getElementById('show-column');
const offersCounter = document.getElementById('offers-counter');

function handleCountOffers() {
  if (offersCounter) {
    offersCounter.innerHTML = cards.length;
  }
}
this.handleCountOffers();

function handleInLineCatalogList() {
  if (showInlineCatalogList) {
    showInlineCatalogList.onclick = e => {
      if (cards) {
        cards.forEach(card => card.classList.add('secondary'));
      }
      showColumnCatalogList.classList.remove('active');
      showInlineCatalogList.classList.add('active');
      showInlineCatalogList.setAttribute('aria-pressed', 'true');
      showColumnCatalogList.setAttribute('aria-pressed', 'false');
    };
  }
}
this.handleInLineCatalogList();

function handleColumnCatalogList() {
  if (showColumnCatalogList) {
    showColumnCatalogList.onclick = e => {
      if (cards) {
        cards.forEach(card => card.classList.remove('secondary'));
        e;
      }
      showInlineCatalogList.classList.remove('active');
      showColumnCatalogList.classList.add('active');
      showColumnCatalogList.setAttribute('aria-pressed', 'true');
      showInlineCatalogList.setAttribute('aria-pressed', 'false');
    };
  }
}
this.handleColumnCatalogList();
