const products = [
  { id: 1, name: "Signature Tee", price: 35, img: "images/tee.jpg" },
  { id: 2, name: "Heavy Hoodie", price: 70, img: "images/hoodie.jpg" },
  { id: 3, name: "Cargo Pants", price: 80, img: "images/cargo.jpg" },
  { id: 4, name: "Cap", price: 25, img: "images/cap.jpg" },
];

// Safe element lookups (works on every page)
const productGrid = document.getElementById("productGrid");
const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const closeBtn = document.getElementById("closeBtn");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const yearEl = document.getElementById("year");

if (yearEl) yearEl.textContent = new Date().getFullYear();

// Persist cart across pages (so it stays when user moves pages)
let cart = [];
try {
  cart = JSON.parse(localStorage.getItem("elara_cart") || "[]");
} catch {
  cart = [];
}

function saveCart() {
  localStorage.setItem("elara_cart", JSON.stringify(cart));
}

function money(n) {
  return Number(n).toFixed(2);
}

function renderProducts() {
  if (!productGrid) return;

  productGrid.innerHTML = products
    .map(
      (p) => `
      <div class="card">
        <div class="img">
          <img src="${p.img}" alt="${p.name}" loading="lazy" />
        </div>
        <h3>${p.name}</h3>
        <div class="price">$${money(p.price)}</div>
        <button class="smallBtn" data-id="${p.id}">Add to Bag</button>
      </div>
    `
    )
    .join("");

  // Use event listeners instead of inline onclick (cleaner)
  productGrid.querySelectorAll(".smallBtn").forEach((btn) => {
    btn.addEventListener("click", () => addToCart(Number(btn.dataset.id)));
  });
}

function addToCart(id) {
  const p = products.find((x) => x.id === id);
  if (!p) return;
  cart.push(p);
  saveCart();
  updateCart();
}

function updateCart() {
  // If a page doesn't have cart UI, just exit safely
  if (!cartCount || !cartTotal || !cartItems) return;

  cartCount.textContent = cart.length;

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = money(total);

  cartItems.innerHTML =
    cart.length === 0
      ? `<div style="opacity:.7">Cart is empty.</div>`
      : cart
          .map(
            (item, idx) => `
      <div class="cartRow">
        <div>
          <div style="font-weight:700">${item.name}</div>
          <div style="opacity:.7; font-size:12px">$${money(item.price)}</div>
        </div>
        <button class="removeBtn" data-index="${idx}" style="border:1px solid #e9e9e9; background:transparent; padding:8px 10px; cursor:pointer">
          Remove
        </button>
      </div>
    `
          )
          .join("");

  cartItems.querySelectorAll(".removeBtn").forEach((btn) => {
    btn.addEventListener("click", () => removeItem(Number(btn.dataset.index)));
  });
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  updateCart();
}

// Modal open/close only if elements exist
if (cartBtn && cartModal) {
  cartBtn.addEventListener("click", () => (cartModal.style.display = "flex"));
}
if (closeBtn && cartModal) {
  closeBtn.addEventListener("click", () => (cartModal.style.display = "none"));
}
if (cartModal) {
  cartModal.addEventListener("click", (e) => {
    if (e.target === cartModal) cartModal.style.display = "none";
  });
}

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    alert("Checkout is demo for now.");
  });
}

// Run
renderProducts();
updateCart();