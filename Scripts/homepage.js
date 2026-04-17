const apiUrl = "https://striveschool-api.herokuapp.com/api/product";
const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZjJmYzczOWY4NzAwMTU3YWIwOWYiLCJpYXQiOjE3NzY0MTU0ODQsImV4cCI6MTc3NzYyNTA4NH0._X9ujN8E-c1XGV13YfVGhmmENeQrftcYw3krK84laY0";

const getItems = () => {
  fetch(apiUrl, {
    headers: {
      Authorization: apiKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
    .then((data) => {
      document.getElementById("loading").classList.add("d-none");
      console.log("Product saved", data);
      data.forEach((dataObject) => {
        const newCol = document.createElement("div");
        newCol.classList.add("col");
        newCol.innerHTML = `
        <a href="./details.html?id=${dataObject._id}" class="text-decoration-none text-dark">
        <div class="card h-100">
        <img src="${dataObject.imageUrl}" class="card-img-top" alt="graphics card" height="250px">

        <div class="card-body">
        <h5 class="card-title">${dataObject.name}</h5>
        <p class="card-text text-truncate">${dataObject.description}</p>
        <p class="card-text">
          Brand ${dataObject.brand} <br>
          Price: ${dataObject.price}€
        </p>

        <div class="d-flex justify-content-between">
          <span class="btn btn-primary">More info..</span>
          <a href="./backoffice.html?id=${dataObject._id}" class="btn btn-secondary">
            Edit product
          </a>
        </div>
        </div>
        </div>
        </a>
        `;
        const content = document.getElementById("products-lineUp");
        content.appendChild(newCol);
      });
    })
    .catch();
};
getItems();

const footerDate = function () {
  const span = document.getElementById("date");

  const today = new Date();

  const fullDate = today.toLocaleDateString();
  span.innerText = fullDate;
};

footerDate();
