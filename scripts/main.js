const searchInput = document.querySelector(".search-box");
const seriesTitle = document.querySelectorAll(".seriesTitle");
const navItems = document.querySelector(".nav-items");
const burger = document.querySelector(".hambuger-menu");
const dark = document.querySelector(".night");
const light = document.querySelector(".day");
const nav = document.querySelector("nav");
const cards = document.querySelectorAll(".card");
const title = document.querySelectorAll(".title-button");
const footer = document.querySelector(".footer-section");
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

let allSavedCard = [];
let allCollections = [];
let savingCard = {
  cardId: "",
  //collectionId: "",
  img: "",
  title: "",
  totalEp: "",
};
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
  document.body.style.background = "#F3BAD6";
  document.body.style.fontWeight = "500";
  nav.style.background = "#EA86B6";
  footer.style.background = "#EA86B6";
  navItems.style.background = "#EA86B6";
  cards.forEach((card) => {
    card.style.background = "#EA86B6";
    card.style.border = "none";
  });
  title.forEach((header) => {
    header.style.background = "#EA86B6";
    header.style.border = "none";
  });
});

window.addEventListener("DOMContentLoaded", () => {
  showAllCollections();
  const allSavingCards = getSaveCard();
  allSavingCards.forEach((card) => {
    cards.forEach((item) => {
      if (item.firstElementChild.textContent == card.cardId) {
        item.querySelector(
          ".save-icon"
        ).innerHTML = `<i class="fas fa-bookmark"></i>`;
      }
    });
  });
});
function showAllCollections() {
  const collectionsData = getCollection();
  if (collectionsData?.length > 0) {
    collectionsData.forEach((collection) => {
      addCollections(collection);
    });
  }
}
function getSaveCard() {
  if (localStorage.getItem("series.savedCard")) {
    allSavedCard = JSON.parse(localStorage.getItem("series.savedCard"));
  }
  return allSavedCard;
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
function removeSaveCardFromLocalStorage(cardId) {
  let saveCards = getSaveCard();
  saveCards = saveCards.filter((item) => item.cardId != cardId);
  localStorage.setItem("series.savedCard", JSON.stringify(saveCards));
}

function checkedId(cardId) {
  let flag = 0;
  const saveItems = getSaveCard();
  saveItems.forEach((item) => {
    if (item.cardId == cardId) {
      flag += 1;
    } else {
      flag = flag;
    }
  });
  return flag;
}

cards.forEach((card) => {
  card.querySelector(".save-icon").addEventListener("click", (e) => {
    const selectedCard = e.target.parentElement.parentElement;
    const selectedCardId = selectedCard.firstElementChild.textContent;
    const exists = checkedId(selectedCardId);

    if (exists) {
      const confirmDelete = confirm(
        "Are you sure, all saved series will be lost !"
      );
      if (confirmDelete) {
        removeSaveCardFromLocalStorage(selectedCardId);
        const icon = selectedCard.querySelector(".save-icon");
        icon.innerHTML = `<i class="far fa-bookmark"></i>`;
      }
    } else {
      addSavedCardToLocalStorage(selectedCard);
    }
  });
});
// saveIcons.forEach((saveIcon) => {
//   saveIcon.addEventListener("click", (e) => {
//     const btn = e.target.parentElement;
//     const cardId = btn.previousElementSibling.textContent;

//     const isExisted = checkedId(cardId);

//     if (isExisted == 0) {
//       modal.classList.remove("filtered");

//       collectionList.addEventListener("click", (e) => {
//         const collectionId = e.target.querySelector("#id").textContent;
//         console.log(collectionId);
//         //modal.classList.add("filtered");
//       });
//     } else {
//       console.log("already exist");
//     }
//     if (!isExisted) {

//       modal.classList.remove("filtered");
//       const allCollections = document.querySelectorAll(".single-collection");
//       allCollections.forEach((collection) => {
//         collection.addEventListener("click", (e) => {
//           console.log("click collection");
//           const savedCard = btn.parentElement;
//           const selectedId = e.target.firstElementChild.textContent;

//           const addId = document.createElement("span");
//           addId.setAttribute("hidden", "hidden");
//           addId.setAttribute("id", "collectionId");
//           addId.textContent = selectedId;
//           savedCard.appendChild(addId);
//           const icon = btn.closest(".save-icon");
//           icon.innerHTML = `<i class="fas fa-bookmark"></i>`;

//           //console.log("save card id", cardId);
//           addSavedCardToLocalStorage(savedCard);
//           alert("Saved");
//           modal.classList.add("filtered");
//         });
//       });
//     }

//       let exists = false;
//       const saveItems = getSaveCard();

//       console.log(saveItems.length);
//       if (saveItems.length > 0) {
//         console.log("greater 0");
//         saveItems.filter((item) => {
//           if (item.cardId == cardId) {
//             exists = true;
//           }
//         });
//         if (exists) {
//           console.log("exists", exists);
//           alert("Unsave");
//           console.log("exist card id", cardId);
//           //removeSaveCardFromLocalStorage(cardId);
//         } else {
//           console.log("not exists");
//           modal.classList.remove("filtered");
//     const allCollections = document.querySelectorAll(".single-collection");
//     allCollections.forEach((collection) => {
//       collection.addEventListener("click", (e) => {
//         const selectedId = e.target.firstElementChild.textContent;

//         const addId = document.createElement("span");
//         addId.setAttribute("hidden", "hidden");
//         addId.setAttribute("id", "collectionId");
//         addId.textContent = selectedId;
//         savedCard.appendChild(addId);
//         const icon = btn.closest(".save-icon");
//         icon.innerHTML = `<i class="fas fa-bookmark"></i>`;

//         console.log("save card id", cardId);
//         addSavedCardToLocalStorage(savedCard);
//         alert("Saved");
//         modal.classList.add("filtered");
//             });
//           });
//         }
//       }
//       if (saveItems.length == 0) {
//         console.log("length equal 0");
//         modal.classList.remove("filtered");

//         const allCollections = document.querySelectorAll(".single-collection");
//         allCollections.forEach((collection) => {
//           collection.addEventListener("click", (e) => {
//             const selectedId = e.target.firstElementChild.textContent;

//             const addId = document.createElement("span");
//             addId.setAttribute("hidden", "hidden");
//             addId.setAttribute("id", "collectionId");
//             addId.textContent = selectedId;
//             savedCard.appendChild(addId);
//             const icon = btn.closest(".save-icon");
//             icon.innerHTML = `<i class="fas fa-bookmark"></i>`;
//             console.log("save card id", cardId);
//             addSavedCardToLocalStorage(savedCard);
//             alert("Saved");
//             modal.classList.add("filtered");
//           });
//         });
//       }
//   });
// });

function addSavedCardToLocalStorage(savedCard) {
  const icon = savedCard.querySelector(".save-icon");

  savingCard.cardId = savedCard.firstElementChild.textContent;
  //savingCard.collectionId = savedCard.lastElementChild.textContent;
  savingCard.img = savedCard.querySelector("img").getAttribute("src");
  savingCard.title = savedCard.querySelector(".seriesTitle").textContent;
  savingCard.totalEp = document
    .querySelector(".seriesTitle")
    .nextElementSibling.textContent.slice(-2);

  let allSaveCard = getSaveCard();
  allSaveCard.push(savingCard);
  localStorage.setItem("series.savedCard", JSON.stringify(allSaveCard));
  icon.innerHTML = `<i class="fas fa-bookmark"></i>`;
  alert("Saved");
  savingCard = {
    cardId: "",
    //collectionId: "",
    img: "",
    title: "",
    totalEp: "",
  };
}

// close modal
modalClose.addEventListener("click", () => {
  form.style.display = "none";
  modal.classList.add("filtered");
});

//for create new collection

class Collections {
  constructor(name) {
    this.name = name;
    this.id = Math.floor(Math.random() * 2000);
  }
}
function savedCollectionsToLocalStorage(collection) {
  let data = getCollection();
  data.push(collection);
  localStorage.setItem("series.collections", JSON.stringify(data));
}

createCollectionBtn.addEventListener("click", (e) => {
  e.preventDefault();

  form.style.display = "flex";
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    //console.log(collectionName.value);
    if (collectionName.value.length > 0) {
      const newCollection = new Collections(collectionName.value);

      addCollections(newCollection);
      savedCollectionsToLocalStorage(newCollection);

      collectionName.value = "";
      form.style.display = "none";
    } else {
      console.log("please fill");
    }
  });
});
cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  form.style.display = "none";
});
