// Hàm init
init();
function init() {
  // get local storage
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
  for (var i = 0; i < cartProducts.length; i++) {
    const cartProduct = cartProducts[i];
    cartProducts[i] = new Product(
      cartProduct.id,
      cartProduct.name,
      cartProduct.price,
      cartProduct.screen,
      cartProduct.backCamera,
      cartProduct.frontCamera,
      cartProduct.img,
      cartProduct.desc,
      cartProduct.type,
      cartProduct.quantity
    );
  }
  // Phần số lượng của giỏ hàng sẽ đc render lại đúng bằng số lượng trong giỏ hàng khi refresh
  document.getElementById("product-count").innerHTML = cartProducts.length;
  // Cập nhật total price
  cartDisplay(cartProducts);
  handleCartProductsTotal();
}

// Hàm render sp ra giao diện giỏ hàng
function cartDisplay(products) {
  const html = products.map((product) => {
    return `
      <div class="cart-item">
      <div class="item-img" style="width: 15%">
        <img
          src="${product.img}"
          alt="Photo"
          width="70px"
        />
      </div>
      <span class="product-name" style="width: 40%">${product.name}</span>
      <div class="quantity" style="width: 20%">
        <button class="button-control" onclick="handleDecreaseCartProduct('${
          product.id
        }')">
          <i class="fas fa-chevron-left"></i>
        </button>
        <span id="product-quantity">${product.quantity}</span>
        <button class="button-control" onclick="handleIncreaseCartProduct('${
          product.id
        }')">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
      <span class="price" style="width: 20%">${product
        .getPrice()
        .toLocaleString("vi-VN")} ₫</span>
      <button class="trash" style="width: 5%"><i class="fa-solid fa-trash" onclick="handleDeleteProduct('${
        product.id
      }')"></i></button>
    </div>
      `;
  });

  document.querySelector(".main").innerHTML = html.join("");
}

// Xóa product trong cart
function handleDeleteProduct(productId) {
  const count = document.getElementById("product-count");
  const productIndex = cartProducts.findIndex((product) => {
    return product.id === productId;
  });

  cartProducts.splice(productIndex, 1);
  // set lai local storage
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  // update số lượng cart
  count.innerHTML = cartProducts.length;
  // render giao diện
  init();
}

// Xử lý tăng số lượng trong giỏ hàng
function handleIncreaseCartProduct(productId) {
  //   lặp và khởi tạo đối tượng
  for (var i = 0; i < cartProducts.length; i++) {
    const cartProduct = cartProducts[i];
    cartProducts[i] = new Product(
      cartProduct.id,
      cartProduct.name,
      cartProduct.price,
      cartProduct.screen,
      cartProduct.backCamera,
      cartProduct.frontCamera,
      cartProduct.img,
      cartProduct.desc,
      cartProduct.type,
      cartProduct.quantity
    );
  }

  const product = cartProducts.find((product) => {
    return product.id === productId;
  });
  if (product) {
    product.quantity += 1;
    // render laị giá sp
    product.getPrice();
    // update lai local storage
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }
  // // Render lại total price
  handleCartProductsTotal();
  cartDisplay(cartProducts);
}

// Xử lý giảm số lượng trong giỏ hàng, từ đó thay đổi giá sp
function handleDecreaseCartProduct(productId) {
  //   lặp và khởi tạo đối tượng
  for (var i = 0; i < cartProducts.length; i++) {
    const cartProduct = cartProducts[i];
    cartProducts[i] = new Product(
      cartProduct.id,
      cartProduct.name,
      cartProduct.price,
      cartProduct.screen,
      cartProduct.backCamera,
      cartProduct.frontCamera,
      cartProduct.img,
      cartProduct.desc,
      cartProduct.type,
      cartProduct.quantity
    );
  }

  const product = cartProducts.find((product) => {
    return product.id === productId;
  });
  if (product) {
    product.quantity -= 1;
    if (product.quantity === 0) {
      product.quantity = 1;
    }
    // render laị giá sp
    product.getPrice();
    // update lai local storage
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    // render laị total price
    handleCartProductsTotal();
  }
  cartDisplay(cartProducts);
}
// Function tính và render ra tổng tiền trong cart
function handleCartProductsTotal() {
  // Khởi tạo đối tượng
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
  for (let i = 0; i < cartProducts.length; i++) {
    const product = cartProducts[i];
    cartProducts[i] = new Product(
      product.id,
      product.name,
      product.price,
      product.screen,
      product.backCamera,
      product.frontCamera,
      product.img,
      product.desc,
      product.type,
      product.quantity
    );
  }
  if (cartProducts.length === 0) {
    document.getElementById("total-price").innerHTML = `0 ₫`;
    document.querySelector(".main").innerHTML = `
    <h4>
    Hình như bạn quên bỏ sản phẩm vào đây? <br />
    Trong này chả có gì cả!!!
  </h4>`;
  }

  const total = cartProducts.reduce((total, product) => {
    return total + product.getPrice();
  }, 0);
  document.getElementById("total-price").innerHTML = `${total.toLocaleString(
    "vi-VN"
  )} ₫`;
}
// Handle footer-button giỏ hàng
// Handle click delete-btn
document
  .getElementById("delele-btn")
  .addEventListener("click", handleDeleteAll);
function handleDeleteAll() {
  const count = document.getElementById("product-count");
  // gán lại cart thành mảng rỗng
  cartProducts = [];
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  // cập nhật lại biến đếm trên giỏ hàng
  count.innerHTML = cartProducts.length;
  handleCartProductsTotal();
}

// Handle click buy-btn
document.getElementById("buy-btn").addEventListener("click", () => {
  const count = document.getElementById("product-count");
  // gán lại cart thành mảng rỗng
  cartProducts = [];
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  // cập nhật lại biến đếm trên giỏ hàng
  count.innerHTML = cartProducts.length;
  document.getElementById("total-price").innerHTML = `0 ₫`;
  document.querySelector(".main").innerHTML = `
    <h4>
    Mua hàng thành công, sản phẩm sẽ được giao cho quý khách trong vòng 2h <br />
  </h4>`;
});
function handleBuy() {
  alert("Chức năng tạm thời bị khóa, vui lòng thử lại sau");
}
