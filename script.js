let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  document.getElementById("cartCount").textContent = cart.length;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function renderCartItems() {
  const cartItemsEl = document.getElementById("cartItems");
  cartItemsEl.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Удалить";
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      saveCart();
      renderCartItems();
    };
    li.appendChild(removeBtn);
    cartItemsEl.appendChild(li);
  });
}

document.querySelectorAll(".product").forEach((productEl) => {
  const name = productEl.querySelector("h3").textContent;
  productEl.querySelector("button").addEventListener("click", () => {
    cart.push(name);
    saveCart();
    alert(`${name} добавлен в корзину`);
  });
});

document.getElementById("cartButton").addEventListener("click", () => {
  document.getElementById("cartModal").style.display = "block";
  renderCartItems();
});

document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("cartModal").style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === document.getElementById("cartModal")) {
    document.getElementById("cartModal").style.display = "none";
  }
});

document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  document.querySelectorAll(".product").forEach((product) => {
    const name = product.querySelector("h3").textContent.toLowerCase();
    product.style.display = name.includes(query) ? "inline-block" : "none";
  });
});

updateCartCount();