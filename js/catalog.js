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

function handleFilterListType() {
  const listType = document.getElementById('list-type');
  if (!listType) return;

  listType.onclick = e => {
    if (e.target.tagName.toUpperCase() === 'LABEL') {
      return;
    }
  };
}
handleFilterListType();

/********** CATALOG - FILTER SIDEBAR **********/
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const sidebarOverlayButton = document.querySelectorAll('.sidebar-button--close');
const filterButton = document.getElementById('filter-btn');

function handleFilterSidebarShowOnClick() {
  filterButton.onclick = e => {
    filterButton.classList.add('active');
    sidebarOverlay.classList.add('show');
    sidebar.classList.add('show');
  };
}
handleFilterSidebarShowOnClick();

function handleSidebarOverlaySelfCloseOnClick() {
  sidebarOverlay.onclick = e => {
    filterButton.classList.remove('active');
    sidebarOverlay.classList.remove('show');
    sidebar.classList.remove('show');
  };
}
handleSidebarOverlaySelfCloseOnClick();

function handleFilterSidebarCloseOnClick() {
  sidebarOverlayButton.forEach(element => {
    element.onclick = e => {
      filterButton.classList.remove('active');
      sidebarOverlay.classList.remove('show');
      sidebar.classList.remove('show');
    };
  });
}
handleFilterSidebarCloseOnClick();

/********** CATALOG - FILTER VALUES **********/
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
          <option value=${mileage.value}>${mileage.value}</option>
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
