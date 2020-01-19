class Product {
  constructor(name, price, year) {
    this.name = name;
    this.price = price;
    this.year = year;
  }
}
class UI {
  addProduct(product) {
    const productList = document.getElementById("product-list");
    const element = document.createElement("div");
    element.innerHTML = `
    <div class='card text-center mb-4'>
        <div class="card-body">
            <strong>Product</strong>: ${product.name}<br>
            <strong>Product price</strong>: ${product.price}<br>
            <strong>Product year</strong>: ${product.year}<br>
            <a href="#" name="delete" class="btn btn-danger mt-2 ml-2">Delete</a>
        </div>
    </div>
    `;
    productList.appendChild(element);
  }
  resetForm() {
    document.getElementById("product-form").reset();
  }
  deleteProduct(element) {
    if (element.name === "delete") {
      element.parentElement.parentElement.parentElement.remove();
      this.showMessage("Product deleted successfully", "info");
    }
  }
  showMessage(message, cssClass) {
    const containerMsg = document.createElement("div");
    containerMsg.className = `alert alert-${cssClass} mt-3`;
    containerMsg.appendChild(document.createTextNode(message));

    //showing in dom
    const container = document.querySelector(".container");
    const app = document.querySelector("#App");
    container.insertBefore(containerMsg, app);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
}

// DOM events
document.getElementById("product-form").addEventListener("submit", e => {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const year = document.getElementById("year").value;

  const product = new Product(name, price, year);

  const ui = new UI();

  if (name === "" || price === "" || year === "") {
    return ui.showMessage("Complete fields please", "danger");
  }

  ui.addProduct(product);
  ui.resetForm();
  ui.showMessage("Product added successfully", "success");

  e.preventDefault();
});

document.getElementById("product-list").addEventListener("click", e => {
  const ui = new UI();
  ui.deleteProduct(e.target);
});
