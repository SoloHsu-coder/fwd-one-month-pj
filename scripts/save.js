const createBtn = document.querySelector(".createBtn");
const form = document.querySelector(".collection-form");
const savedBtn = document.querySelector(".savedBtn");
const unsaveBtn = document.querySelectorAll(".unsavedBtn");
const collectionName = document.querySelector(".collectionName");
const collectionList = document.querySelector(".collection-list");
const deleteBtn = document.querySelector(".deleteBtn");
const saveCardIds = document.querySelectorAll("span");
const saveCardsContainer = document.querySelector(".save-items");
const allSaveCard = document.querySelectorAll(".saved-card");
const showAllBtn = document.querySelector(".showAllBtn");
// const collections = [
//   { id: 1, name: "Later" },
//   { id: 2, name: "Favourites" },
//   { id: 3, name: "Old Series" },
// ];
let allCollections = [];
class Collections {
  constructor(name) {
    this.name = name;
    this.id = Math.floor(Math.random() * 2000);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  showAllCollections();
});

function getCollection() {
  if (localStorage.getItem("series.collections")) {
    allCollections = JSON.parse(localStorage.getItem("series.collections"));
  }
  return allCollections;
}

function addCollectionsToSideBar(collection) {
  // collectionList.innerHTML = "";
  const newCollectionUI = document.createElement("li");
  newCollectionUI.innerHTML = `
  <small hidden>${collection.id}</small>
                  <img src="images/wrtw.jpeg" />
                  <span>${collection.name}</span>
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
    collectionList.innerHTML = `<li class='no-collection'>
        <span ><i class="fas fa-times"></i>No Collections</span>
    </li>
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
    //console.log(currentCollectionId);
  }
});

function filterSeriesByCollection(id) {
  console.log(id);
  allSaveCard.forEach((saveCard) => {
    if (saveCard.lastElementChild.textContent != id) {
      saveCard.classList.add("filtered");
    } else {
      saveCard.classList.remove("filtered");
    }
  });
}
showAllBtn.addEventListener("click", (e) => {
  allSaveCard.forEach((saveCard) => {
    if (saveCard.classList.contains("filtered")) {
      saveCard.classList.remove("filtered");
    }
  });
});

unsaveBtn.forEach((unsave) => {
  unsave.addEventListener("click", (e) => {
    const unsaveCard = e.target.parentElement;
    const unsaveId = unsaveCard.lastElementChild.textContent;
    unsaveCard.classList.add("unsavedCard");
  });
});
