const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEzYWM3M2M1NmIzNjAwMTMzZmU1NmUiLCJpYXQiOjE2NzkwNjUxMDIsImV4cCI6MTY4MDI3NDcwMn0.aWB1ik6v98FCzAPLJa0NmUn2B8sZFgttndKML6-DAsc";

let productId = new URLSearchParams(window.location.search).get("productId");

const getProduct = async function () {
  try {
    let response = await fetch(API_URL + productId, {
      method: "GET",
      headers: {
        Authorization: TOKEN,
      },
    });
    if (response.ok) {
      let prod = await response.json();
      console.log(prod);
      let rowRef = document.querySelector("main .row");
      console.log(rowRef);
      rowRef.innerHTML = `<div class="col col-8 mt-5 m-auto">
      <div class="card mb-4 shadow-sm">
      <img src="${prod.imageUrl}" alt="${prod.name} image">
        <div class="card-body d-flex flex-column justify-content-between">
          <h5 class="card-title">${prod.name}</h5>
          <p class="card-text">
            Brand: ${prod.brand}<br>
            Description:${prod.description}<br>
            ID: ${prod._id}
          <div class="d-flex justify-content-between align-items-center">
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <a href="./homepage.html" class="btn btn-sm btn-outline-secondary">Go back</a>
          <a  class="btn btn-sm btn-outline-secondary">Add to cart</a>
          </div>
          </div>
        </div>
      </div>
    </div>`;
    } else {
      return new Error("Error while loadig product details");
    }
  } catch (error) {
    console.log(error);
  }
};

getProduct();
