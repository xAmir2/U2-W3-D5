const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZjJmYzczOWY4NzAwMTU3YWIwOWYiLCJpYXQiOjE3NzY0MTU0ODQsImV4cCI6MTc3NzYyNTA4NH0._X9ujN8E-c1XGV13YfVGhmmENeQrftcYw3krK84laY0";

const params = new URLSearchParams(location.search);
const productID = params.get("id");

const moreInfo = () => {
  fetch(apiUrl + productID, {
    headers: {
      Authorization: apiKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error while getting products info");
      }
    })
    .then((data) => {
      document.getElementById("loading").classList.add("d-none");
      const row = document.getElementById("products-info");

      row.innerHTML = `
        <div class="col-12 col-md-6">
            <div class="card">
                <img src="${data.imageUrl}" class="card-img-top" alt="graphics card">
                <div class="card-body">
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">${data.description}</p>
                    <p class="card-text">Brand ${data.brand}  </br> Price: ${data.price}€</p>
                    
                </div>
            </div>
        </div>
    `;
    })
    .catch((err) => {
      console.log("Fetch error", err);
    });
};

moreInfo();

const footerDate = function () {
  const span = document.getElementById('date');

  const today = new Date();

  const fullDate = today.toLocaleDateString(); 
  span.innerText = fullDate;
};

footerDate();
