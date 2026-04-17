const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZjJmYzczOWY4NzAwMTU3YWIwOWYiLCJpYXQiOjE3NzY0MTU0ODQsImV4cCI6MTc3NzYyNTA4NH0._X9ujN8E-c1XGV13YfVGhmmENeQrftcYw3krK84laY0";

const params = new URLSearchParams(location.search);
const productID = params.get("id");

class Product {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

const form = document.getElementById("product-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const imageUrl = document.getElementById("imgUrl").value;
  const price = parseFloat(document.getElementById("price").value);
  const newProduct = new Product(name, description, brand, imageUrl, price);
  console.log(newProduct);

  let urlToUse;
  if (productID) {
    urlToUse = apiUrl + productID;
  } else {
    urlToUse = apiUrl;
  }

  fetch(urlToUse, {
    method: productID ? "PUT" : "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        form.reset();
      } else {
        throw new Error("Error: server rejected the product");
      }
    })
    .catch((err) => {
      console.log("Save failed", err);
    });
});
if (productID)
  fetch(apiUrl + productID, {
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
      document.getElementById("name").value = data.name;
      document.getElementById("description").value = data.description;
      document.getElementById("brand").value = data.brand;
      document.getElementById("imgUrl").value = data.imageUrl;
      document.getElementById("price").value = data.price;
    })
    .catch((err) => {
      console.log("Error", err);
    });

const productDelete = document.getElementById("productDelete");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

const formReset = document.getElementById("formReset");
const confirmResetBtn = document.getElementById("confirmResetBtn");

const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
const resetModal = new bootstrap.Modal(document.getElementById("resetModal"));

productDelete.addEventListener("click", () => {
  deleteModal.show();
});

confirmDeleteBtn.addEventListener("click", () => {
  fetch(apiUrl + productID, {
    method: "DELETE",
    headers: {
      Authorization: apiKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        location.assign("./homepage.html");
      } else {
        throw new Error("Error cannot delete");
      }
    })
    .catch((err) => {
      console.log("Fetch error", err);
    });
});

formReset.addEventListener("click", (e) => {
  e.preventDefault();
  resetModal.show();
});

confirmResetBtn.addEventListener("click", () => {
  form.reset();
  resetModal.hide();
});

const footerDate = function () {
  const span = document.getElementById('date');

  const today = new Date();

  const fullDate = today.toLocaleDateString(); 
  span.innerText = fullDate;
};

footerDate();
