const searchInput = document.querySelector(".search-box");
const seriesTitle = document.querySelectorAll(".seriesTitle");
const navItems = document.querySelector(".nav-items");
const burger = document.querySelector(".hambuger-menu");
const dark = document.querySelector(".night");
const light = document.querySelector(".day");
const nav = document.querySelector("nav");
const cards = document.querySelectorAll(".card");
const title = document.querySelectorAll("h4");
const footer = document.querySelector("footer");
const card = document.querySelector(".card");
const saveIcons = document.querySelectorAll(".save-icon");
const savedSeries = document.querySelectorAll("span");
const modal = document.querySelector("#modal");
const modalClose = document.querySelector(".modal-closeBtn");
const collectionList = document.querySelector(".collection-list");
const createCollectionBtn = document.querySelector(".createBtn");
const form = document.querySelector(".collection-form");
const cancelBtn = document.querySelector(".cancelBtn");
const collectionName = document.querySelector(".collection-name");
let savedCardId = [];
let allCollections = [];
//for search
searchInput.addEventListener("keyup", (e) => {
  //console.log(e.target.value);
  const searchQuery = searchInput.value.trim().toLowerCase();
  seriesTitle.forEach((name) => {
    if (!name.textContent.toLowerCase().includes(searchQuery)) {
      name.parentElement.classList.add("filtered");
    }
    if (name.textContent.toLowerCase().includes(searchQuery)) {
      name.parentElement.classList.remove("filtered");
    }
  });
});

// for burger

burger.addEventListener("click", (e) => {
  burger.classList.toggle("toggle");
  navItems.classList.toggle("visible");
});

// theme
dark.addEventListener("click", (e) => {
  document.body.style.background = "#02010a";

  nav.style.background = "#140152";
  footer.style.background = "#140152";
  navItems.style.background = "#140152";
  cards.forEach((card) => {
    card.style.background = "#04052e";
  });
  title.forEach((header) => {
    header.style.background = "#140152";
  });
});

light.addEventListener("click", (e) => {
  document.body.style.background = "url(images/lightBg.jpeg) no-repeat ";
  document.body.style.backgroundSize = "cover";
  nav.style.background = "#eb627b";
  footer.style.background = "#eb627b";
  navItems.style.background = "#eb627b";
  cards.forEach((card) => {
    card.style.background = "#eb627b";
  });
  title.forEach((header) => {
    header.style.background = "#eb627b";
  });
});

window.addEventListener("DOMContentLoaded", () => {
  showAllCollections();
});
function showAllCollections() {
  const collectionsData = getCollection();
  if (collectionsData?.length > 0) {
    collectionsData.forEach((collection) => {
      addCollections(collection);
    });
  }
}
function getCollection() {
  if (localStorage.getItem("series.collections")) {
    allCollections = JSON.parse(localStorage.getItem("series.collections"));
  }
  return allCollections;
}

//for Save
function addCollections(collection) {
  const newCollectionUI = document.createElement("li");
  newCollectionUI.classList = "single-collection";
  newCollectionUI.innerHTML = `
  <small id='id' hidden>${collection.id}</small>
                  <img src="images/wrtw.jpeg" />
                  <span>${collection.name}</span>
                  
              `;
  collectionList.appendChild(newCollectionUI);
}

saveIcons.forEach((saveIcon) => {
  saveIcon.addEventListener("click", (e) => {
    const btn = e.target.parentElement;
    const cardId = btn.previousElementSibling.textContent;
    const savedCard = btn.parentElement;
    modal.showModal();

    const allCollections = document.querySelectorAll(".single-collection");
    allCollections.forEach((collection) => {
      collection.addEventListener("click", (e) => {
        const selectedId = e.target.firstElementChild.textContent;

        const addId = document.createElement("span");
        addId.setAttribute("hidden", "hidden");
        addId.setAttribute("id", "collectionId");
        addId.textContent = selectedId;

        savedCard.appendChild(addId);
        const icon = btn.closest(".save-icon");
        icon.innerHTML = `<i class="fas fa-bookmark"></i>`;

        modal.close();
      });
    });
  });
});

// close modal
modalClose.addEventListener("click", () => {
  form.style.display = "none";
  modal.close();
});

//for create new collection

createCollectionBtn.addEventListener("click", (e) => {
  e.preventDefault();
  form.style.display = "flex";
});
cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("click");
  form.style.display = "none";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(collectionName.value);
});
