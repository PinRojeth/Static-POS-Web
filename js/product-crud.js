function getCookie(name) {
  let cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

function setCookie(name, value, expiredDay) {
  const date = new Date();
  date.setTime(date.getTime() + expiredDay * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`;
}

function loadProduct() {
  let productCookie = getCookie("products");
  return productCookie ? JSON.parse(productCookie) : [];
}

let products = loadProduct();

function saveProduct() {
  setCookie("products", JSON.stringify(products));
  console.log(products);
}

let form = document.getElementById("productForm");
let productNameInput = document.getElementById("product-name");
let priceInput = document.getElementById("price");
let stockInput = document.getElementById("stock");
let categoryInput = document.getElementById("category");
let descriptionInput = document.getElementById("description");
let buttonSubmit = document.getElementById("btn-submit");
let productList = document.getElementById("product-list");


form.addEventListener("submit", (e) => {
  e.preventDefault();
  const productName = productNameInput.value.trim();
  const price = priceInput.value.trim();
  const stock = stockInput.value.trim();
  const category = categoryInput.value.trim();
  const description = descriptionInput.value.trim();
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  // Ensure the values are not empty
  if (productName && price && stock) {
    const newProduct = {
      productName,
      formattedPrice,
      stock,
      category,
      description,
    };
    products.push(newProduct); // Add new product to the array
    saveProduct(); // Save the updated product list
    renderProduct(); // Re-render the product list
  }

  // Reset form fields
  productNameInput.value = "";
  priceInput.value = "";
  stockInput.value = "";
  categoryInput.value = "";
  descriptionInput.value = "";
});

function renderProduct() {
  productList.innerHTML = "";
  products.forEach((product, index) => {
    productList.innerHTML += `<tr>
            <td>${(index + 1).toString().padStart(1, "0")}</td>
          <td>${product.productName}</td>
          <td>${product.formattedPrice}</td>
          <td>${product.stock}</td>
          <td>${product.category}</td>
          <td>${product.description}</td>
          <td>
              <button class="btn btn-success btn-sm " onclick= "editEmployee(${index})" >Edit</button>
              <button class="btn btn-danger btn-sm " onclick= "deleteEmployee(${index})">Delete</button>
          </td>
      </tr>`;
  });
}

renderProduct();
