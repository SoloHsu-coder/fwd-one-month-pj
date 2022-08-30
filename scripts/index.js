const cardContainer = document.querySelector("card-container");
const trending = document.querySelector(".trending");
let allData;

let trendingSeries;
let popularSeries;
let ongoingSeries;
let trendingSeriesImg = [
  "../images/wrtw.jpeg",
  "../images/dos.jpeg",
  "../images/jof.jpeg",
  "../images/chero.jpeg",
];
const getData = async () => {
  const response = await fetch("scripts/data.json");
  const allData = await response.json();
  return allData;
};
{
  /* <div class="card" onmouseover="showSave()" onmouseout="hideSave()">
  <button class="save-icon filtered">
    <i class="fas fa-ellipsis-v"></i>
  </button>
  <img src="images/wrtw.jpeg" alt="wrtw" />
  <a href="singleSeries.html" class="seriesTitle">
    Who rules the world
  </a>
  <p>Total Episodes - 45</p>
</div>; */
}
getData().then((data) => {
  getSeries(data);
});
const getSeries = (data) => {
  console.log(data);
  if (data) {
    trendingSeries = data.slice(0, 5);
    popularSeries = data.slice(5, 10);
    ongoingSeries = data.slice(10, 15);
  }

  trendingSeries.forEach((series, index) => {
    console.log(index);
    trending.innerHTML = `<div class="card" onmouseover="showSave()" onmouseout="hideSave()"></div>
    <button class="save-icon filtered">
      <i class="fas fa-ellipsis-v"></i>
    </button>
    <img src=${trendingSeriesImg[index]} alt="wrtw" />
    <a href="singleSeries.html" class="seriesTitle">
      ${series.name}
    </a>
    <p>${series.totalEp}</p>`;
  });
  //   trending.innerHTML = `<div class="card" onmouseover="showSave()" onmouseout="hideSave()"></div>
  // <button class="save-icon filtered">
  //   <i class="fas fa-ellipsis-v"></i>
  // </button>
  // <img src="images/wrtw.jpeg" alt="wrtw" />
  // <a href="singleSeries.html" class="seriesTitle">
  //   Who rules the world
  // </a>
  // <p>Total Episodes - 45</p>`;
};

// const displaySeriesCard = (data) => {
//   console.log(data);
// };
class seriesCard {
  constructor(id, img, title, totalEp) {
    this.id = id;
    this.img = img;
    this.title = title;
    this.totalEp = totalEp;
  }
}

function showSave() {
  saveIcon.classList.remove("filtered");
}
function hideSave() {
  saveIcon.classList.add("filtered");
}
