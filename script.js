const products = [
  { id: 1, name: "Signature Tee", price: 35 },
  { id: 2, name: "Heavy Hoodie", price: 70 },
  { id: 3, name: "Cargo Pants", price: 80 },
  { id: 4, name: "Cap", price: 25 },
];

const productGrid = document.getElementById("productGrid");
const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const closeBtn = document.getElementById("closeBtn");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
document.getElementById("year").textContent = new Date().getFullYear();

let cart = [];

function renderProducts() {
  productGrid.innerHTML = products.map(p => `
    <div class="card">
      <div class="img">Photo</div>
      <h3>${p.name}</h3>
      <div class="price">$${p.price}</div>
      <button class="smallBtn" onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join("");
}

function addToCart(id) {
  const p = products.find(x => x.id === id);
  cart.push(p);
  updateCart();
}

function updateCart() {
  cartCount.textContent = cart.length;
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = total;

  cartItems.innerHTML = cart.length === 0
    ? `<div style="opacity:.8">Cart is empty.</div>`
    : cart.map((item, idx) => `
      <div class="cartRow">
        <div>${item.name}</div>
        <div>
          $${item.price}
          <button style="margin-left:10px" onclick="removeItem(${idx})">remove</button>
        </div>
      </div>
    `).join("");
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

cartBtn.addEventListener("click", () => cartModal.style.display = "flex");
closeBtn.addEventListener("click", () => cartModal.style.display = "none");
cartModal.addEventListener("click", (e) => {
  if (e.target === cartModal) cartModal.style.display = "none";
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
  alert("Checkout is demo. For real payments, use Shopify/Stripe later.");
});

renderProducts();
updateCart();