const createBtn = document.querySelector(".createBtn");
const form = document.querySelector(".collection-form");
const savedBtn = document.querySelector(".savedBtn");
const unsaveBtn = document.querySelectorAll(".unsavedBtn");
const collectionName = document.querySelector(".collectionName");
const collectionList = document.querySelector(".collection-list");
const deleteBtn = document.querySelector(".deleteBtn");
const saveCardIds = document.querySelectorAll("span");
const showAllBtn = document.querySelector(".showAllBtn");
const noCollection = document.querySelector(".no-collection");
const saveCardsContainer = document.querySelector(".save-card-container");

// const collections = [
//   { id: 1, name: "Later" },
//   { id: 2, name: "Favourites" },
//   { id: 3, name: "Old Series" },
// ];
let allCollections = [];
let allSavedCard = [];
class Collections {
  constructor(name) {
    this.name = name;
    this.id = Math.floor(Math.random() * 2000);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  showAllCollections();
  showSaveCards();
});

function getCollection() {
  if (localStorage.getItem("series.collections")) {
    allCollections = JSON.parse(localStorage.getItem("series.collections"));
  }
  return allCollections;
}

function getAllSaveCards() {
  if (localStorage.getItem("series.savedCard")) {
    allSavedCard = JSON.parse(localStorage.getItem("series.savedCard"));
  }
  return allSavedCard;
}

function showSaveCards() {
  const savingCard = getAllSaveCards();
  if (savingCard.length > 0) {
    savingCard.forEach((card) => {
      addSaveCardToContainer(card);
    });
  }
}
function addSaveCardToContainer(card) {
  const newCardUI = document.createElement("div");
  newCardUI.classList.add("saved-card");
  newCardUI.innerHTML = `
  <span hidden>${card.cardId}</span>
  <img src=${card.img} />
     <h5>${card.title}</h5>
    <button class="unsavedBtn">Unsave</button>
    <span hidden>1967</span>
  `;
  saveCardsContainer.appendChild(newCardUI);
}
function addCollectionsToSideBar(collection) {
  // collectionList.innerHTML = "";
  const newCollectionUI = document.createElement("li");
  newCollectionUI.innerHTML = `
  <small hidden>${collection.id}</small>
                  <img src="images/wrtw.jpeg" />
                  <span class='collection-name'>${collection.name}</span>
                   <button class='deleteBtn'><i class="fas fa-trash"></i></button>
              `;
  collectionList.appendChild(newCollectionUI);
}

function showAllCollections() {
  let collections = getCollection();
  if (collections?.length > 0) {
    collections.forEach((collection) => {
      addCollectionsToSideBar(collection);
    });
  } else {
    noCollection.innerHTML = `<p class='no-collection'>
        <span ><i class="fas fa-times"></i>No Collections</span>
    </p>
  `;
  }
}
function savedCollectionsToLocalStorage(collection) {
  let data = getCollection();
  data.push(collection);
  localStorage.setItem("series.collections", JSON.stringify(data));
}
function removeCollection(id) {
  let collections = getCollection();
  collections = collections.filter((item) => item.id !== id);
  localStorage.setItem("series.collections", JSON.stringify(collections));
}

form.addEventListener("submit", (e) => {
  console.log(e.target.value);
  e.preventDefault();
  if (collectionName.value.length > 0) {
    noCollection.innerHTML = "";
    console.log(collectionName.value);
    const newCollection = new Collections(collectionName.value);
    console.log(newCollection);
    addCollectionsToSideBar(newCollection);
    savedCollectionsToLocalStorage(newCollection);

    collectionName.value = "";
    form.style.display = "none";
  } else {
    console.log("please fill");
  }
});

createBtn.addEventListener("click", (e) => {
  form.style.display = "flex";
});

collectionList.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    const currentCollection = e.target.closest("li");
    const id = currentCollection.querySelector("small").textContent;
    const confirmDelete = confirm(
      "Are you sure, all saved series will be lost !"
    );
    if (confirmDelete) {
      currentCollection.remove();
      removeCollection(parseInt(id));
    }
  } else {
    const currentCollectionId = e.target.firstElementChild.textContent;
    filterSeriesByCollection(currentCollectionId);
  }
});

function filterSeriesByCollection(id) {
  const allCards = document.querySelectorAll(".saved-card");
  allCards.forEach((card) => {
    if (card.lastElementChild.textContent != id) {
      card.classList.add("filtered");
    } else {
      card.classList.remove("filtered");
    }
  });
}
showAllBtn.addEventListener("click", (e) => {
  const allSaveCard = document.querySelectorAll(".saved-card");
  allSaveCard.forEach((saveCard) => {
    if (saveCard.classList.contains("filtered")) {
      saveCard.classList.remove("filtered");
    }
  });
});

saveCardsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("unsavedBtn")) {
    const cardId = e.target.parentElement.firstElementChild.textContent;
    removeSaveCardFromLocalStorage(cardId);
    e.target.parentElement.remove();
  }
});
function removeSaveCardFromLocalStorage(id) {
  let saveCards = getAllSaveCards();
  saveCards = saveCards.filter((item) => item.cardId != id);
  localStorage.setItem("series.savedCard", JSON.stringify(saveCards));
}
