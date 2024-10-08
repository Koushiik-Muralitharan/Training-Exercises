let products = [];
let editIndex = null;
class Product {
  constructor(name, price, quantity) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    
  }
  checkIfNameExists({ name }) {
    return products.some((product) => {
      return product.name === name;
    });
  }
  addNewProduct(newProduct) {
    if (this.checkIfNameExists(newProduct)) {
      document.getElementById("error-display").textContent =
        "The name already exists.";
    } else {
      document.getElementById("error-display").textContent = "";
      products.push(newProduct);

      console.log(products);
      return true;
    }
  }

  removeProduct(name) {
    products = products.filter((product) => product.name !== name);
    this.display();
  }

  updateProduct(index, updatedProduct) {
    products[index] = updatedProduct;
    this.display();
    resetForm();
  }

  display() {
    let tableContents = document.getElementById("inventory-table");

    tableContents.innerHTML = `<tr>
                               <th>Product Name</th>
                               <th>Price</th>
                               <th>Quantity</th>
                               <th colspan="2">Actions</th>
                               </tr>`;
    products.forEach((product, index) => {
      createRow(product, index);
    });
  }
}

let product = new Product();

// creating a row to add the details fetched from the user and displaying.

function createRow({ name, price, quantity }, index) {
  let tableContents = document.getElementById("inventory-table");

  const row = document.createElement("tr");
  const nameCell = document.createElement("td");
  nameCell.textContent = name;
  row.appendChild(nameCell);

  const priceCell = document.createElement("td");
  priceCell.textContent = price;
  row.appendChild(priceCell);

  const quantityCell = document.createElement("td");
  quantityCell.textContent = quantity;
  row.appendChild(quantityCell);

  //Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Remove";
  deleteButton.addEventListener("click", () => {
    
    product.removeProduct(name);
    console.log(row);

  });
  const deletecell = document.createElement("td");
  deletecell.appendChild(deleteButton);
  row.appendChild(deletecell);

  //Edit Button
  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.addEventListener("click", () => {
    document.getElementById("error-display").textContent = "";
    startEditProduct(index, name, price, quantity);
  });
  const editCell = document.createElement("td");
  editCell.appendChild(editButton);
  row.appendChild(editCell);

  tableContents.appendChild(row);
}

function startEditProduct(index, name, price, quantity) {
  document.getElementById("add-product-button").style.display = "none";
  document.getElementById("update-product-button").style.display = "block";

  inputName.value = name;
  inputPrice.value = price;
  inputQuantity.value = quantity;

  editIndex = index;
}

let inputName = document.getElementById("name");
let inputPrice = document.getElementById("price");
let inputQuantity = document.getElementById("quantity");
let nameError = document.getElementById("for-name-errors");
let priceError = document.getElementById("for-price-errors");
let quantityError = document.getElementById("for-quantity-errors");
let productAdded = document.getElementById("already-added");

inputName.onfocus = function () {
  inputName.style.borderColor = "black";
  nameError.textContent = "";
};
inputName.onblur = function () {
  if (inputName.value.trim() === "") {
    inputName.style.borderColor = "red";
    nameError.textContent = "The name field is empty.*";
  } else if (!isNaN(inputName.value.trim())) {
    inputName.style.borderColor = "red";
    nameError.textContent = "Please enter a valid name.";
  }
};
inputPrice.onfocus = function () {
  inputPrice.style.borderColor = "black";
  priceError.textContent = "";
};
inputPrice.onblur = function () {
  if (inputPrice.value.trim() === "") {
    inputPrice.style.borderColor = "red";
    priceError.textContent = "The price field is empty.*";
  } else if (isNaN(inputPrice.value.trim()) || inputPrice.value < 0) {
    inputPrice.style.borderColor = "red";
    priceError.textContent = "Please enter a valid number";
  }
};
inputQuantity.onfocus = function () {
  inputQuantity.style.borderColor = "black";
  quantityError.textContent = "";
};
inputQuantity.onblur = function () {
  if (inputQuantity.value.trim() === "") {
    inputQuantity.style.borderColor = "red";
    quantityError.textContent = "The quantity field is empty.*";
  } else if (isNaN(inputQuantity.value.trim()) || inputQuantity.value < 0) {
    inputQuantity.style.borderColor = "red";
    quantityError.textContent = "Please enter a valid number";
  }
};

function resetForm() {
  
  document.getElementById("submission").reset();
  document.getElementById("add-product-button").style.display = "block";
  document.getElementById("update-product-button").style.display = "none";
  editIndex = null;
 
}


function validateForm() {
  let valid = true;

  if (inputName.value.trim() === "") {
    inputName.style.borderColor = "red";
    nameError.textContent = "The name field is empty.*";
    valid = false;
  } else if (!isNaN(inputName.value.trim())) {
    inputName.style.borderColor = "red";
    nameError.textContent = "Please enter a valid name.";
    valid = false;
  }

  if (inputPrice.value.trim() === "") {
    inputPrice.style.borderColor = "red";
    priceError.textContent = "The price field is empty.*";
    valid = false;
  } else if (isNaN(inputPrice.value.trim()) || inputPrice.value <= 0) {
    inputPrice.style.borderColor = "red";
    priceError.textContent = "Please enter a valid number for the price.";
    valid = false;
  }

  if (inputQuantity.value.trim() === "") {
    inputQuantity.style.borderColor = "red";
    quantityError.textContent = "The quantity field is empty.*";
    valid = false;
  } else if (isNaN(inputQuantity.value.trim()) || inputQuantity.value <= 0) {
    inputQuantity.style.borderColor = "red";
    quantityError.textContent = "Please enter a valid number for the quantity.";
    valid = false;
  }

  return valid;
}

function submittingForm(event) {
  event.preventDefault();
  productAdded.textContent = ""; 

  if (validateForm()) {
    let productName = inputName.value.trim();
    let productPrice = inputPrice.value.trim();
    let productQuantity = inputQuantity.value.trim();

    const newProduct = new Product(productName, productPrice, productQuantity);

    if (editIndex === null) {
      const added = product.addNewProduct(newProduct);
      if (added) {
        product.display();
        resetForm();
      }
    } else {
      product.updateProduct(editIndex, newProduct);
    }
  } else {
    productAdded.textContent = "Please correct the errors before submitting.";
  }
}