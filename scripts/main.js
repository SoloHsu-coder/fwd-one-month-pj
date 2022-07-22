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
