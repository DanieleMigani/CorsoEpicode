const booksRow = document.getElementById("booksRow");
const sideChart = document.getElementById("sideChart");
const chartClear = document.getElementById("chart-clear");

let delCard = (card) => card.remove();

chartClear.addEventListener("click", () => {
  localStorage.clear();
  sideChart.innerText = "";
});

function makeBookCard(fetchData) {
  let newCard = document.createElement("div");
  newCard.setAttribute("class", "col-md-4 col-sm-6 col-12");

  let newCardWrapper = document.createElement("div");
  newCardWrapper.setAttribute("class", "card mb-4 shadow-sm h-100");

  let newCardImg = document.createElement("img");
  newCardImg.setAttribute("class", "card-img-top");
  newCardImg.setAttribute("src", fetchData.img);
  newCardImg.style.width = "100%";
  newCardImg.style.height = "250px";
  newCardImg.style.objectFit = "contain";

  let newCardBody = document.createElement("div");
  newCardBody.setAttribute("class", "card-body d-flex flex-column justify-content-between");
  newCardBody.style.height = "250px";

  let newCardTitle = document.createElement("h5");
  newCardTitle.setAttribute("class", "card-title");
  newCardTitle.innerText = fetchData.title;

  let newCardText = document.createElement("p");
  newCardText.setAttribute("class", "card-text");
  newCardText.innerText = fetchData.price + " €";

  let newDelCard = document.createElement("button");
  newDelCard.setAttribute("class", "btn btn-sm btn-outline-danger float-end me-2");
  newDelCard.setAttribute("type", "button");
  newDelCard.innerText = "SCARTA";
  newDelCard.addEventListener("click", () => {
    newCardWrapper.remove();
  });

  let chartBtn = document.createElement("button");
  chartBtn.setAttribute("class", "btn btn-sm btn-outline-success float-end me-2");
  chartBtn.setAttribute("type", "button");
  chartBtn.innerText = "COMPRA ORA";
  chartBtn.addEventListener("click", () => {
    let spanChart = document.createElement("span");
    let chartBook = { title: fetchData.title, price: fetchData.price };
    spanChart.innerText = chartBook.title + " - " + chartBook.price + "€";
    localStorage.setItem(`book-${fetchData.asin}`, JSON.stringify(chartBook));
    let removeChartBook = document.createElement("button");
    removeChartBook.setAttribute("class", "btn btn-sm btn-outline-secondary");
    removeChartBook.setAttribute("type", "button");
    removeChartBook.innerText = "RIMUOVI";
    removeChartBook.addEventListener("click", () => {
      localStorage.removeItem(`book-${fetchData.asin}`);
      spanChart.remove();
    });
    spanChart.appendChild(removeChartBook);
    sideChart.appendChild(spanChart);
  });

  newCardBody.appendChild(newCardTitle);
  newCardBody.appendChild(newCardText);
  newCardBody.appendChild(newDelCard);
  newCardBody.appendChild(chartBtn);

  newCardWrapper.appendChild(newCardImg);
  newCardWrapper.appendChild(newCardBody);

  newCard.appendChild(newCardWrapper);

  booksRow.appendChild(newCard);
}

fetch("https://striveschool-api.herokuapp.com/books")
  .then((response) => {
    return response.json();
  })
  .then((payload) => {
    payload.forEach((book) => {
      makeBookCard(book);
    });
  })
  .catch((err) => {
    console.log(err);
  });


