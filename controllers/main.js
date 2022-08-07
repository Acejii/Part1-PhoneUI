// Render ra giao diện
main();

function main() {
  // Call API get danh sách
  apiGetProducts().then((result) => {
    const products = result.data;

    // Lặp và khởi tạo đối tượng

    // Cách 1
    // let products = [];
    // data.forEach((product) => {
    //   product = new Product(
    //     product.id,
    //     product.name,
    //     product.price,
    //     product.screen,
    //     product.backCamera,
    //     product.frontCamera,
    //     product.img,
    //     product.desc,
    //     product.type
    //   );
    //   products.push(product);
    // });
    // console.log(products);

    // Cách 2
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      products[i] = new Product(
        product.id,
        product.name,
        product.price,
        product.screen,
        product.backCamera,
        product.frontCamera,
        product.img,
        product.desc,
        product.type
      );
    }
    // render giao diện
    display(products);
  });
}

// Hàm render ra giao diện
function display(products) {
  const html = products.map((product) => {
    return `
        <div class="row">
        <div class="item">
          <div class="header">
            <div class="branch-logo">
              <img
                src="./assets/img/${product.getLogo()}-logo.png"
                alt="Logo"
                width="70%"
              />
            </div>
            <p>Còn hàng</p>
          </div>
          <div class="item-img">
            <img
              src="${product.img}"
              alt="Photo"
            />
          </div>
          <div class="name">
            <h1>${product.name}</h1>
            <h1 class="price">${product.price.toLocaleString("vi-VN")} ₫</h1>
          </div>
          <div class="describe">
            <p>${product.desc}</p>
            <p><b> Màn hình:</b> ${product.screen}</p>
            <p><b>Camera trước:</b> ${product.backCamera}</p>
            <p><b>Camera sau:</b> ${product.frontCamera}</p>
          </div>

          <div class="btn">
            <button class="buy-btn" onclick="handleBuy()">MUA NGAY</button>
            <button class="cart-add" onclick="handleClickAdd(${product.id})">
              <i class="fa-solid fa-cart-plus"></i>
              Thêm
            </button>
          </div>
        </div>
      </div>
        `;
  });

  document.querySelector(".main-content .container").innerHTML = html.join("");
}

// Filter samsung và iphone
document.getElementById("brand").addEventListener("change", (e) => {
  const value = document.getElementById("brand").value;

  // call API
  apiGetProducts().then((result) => {
    const data = result.data;

    // Lặp và khởi tạo đối tượng

    let products = [];
    data.forEach((product) => {
      product = new Product(
        product.id,
        product.name,
        product.price,
        product.screen,
        product.backCamera,
        product.frontCamera,
        product.img,
        product.desc,
        product.type
      );
      products.push(product);
    });

    // Filter theo brand
    const brandProducts = products.filter((product) => {
      return product.type.toLowerCase() === value;
    });
    // render

    if (brandProducts.length === 0) {
      display(products);
    } else {
      display(brandProducts);
    }
  });
});

// Search product = enter
document
  .getElementById("product-search")
  .addEventListener("keypress", handleSearch);
function handleSearch(e) {
  const search = document.getElementById("product-search").value;
  if (e.key !== "Enter") {
    return;
  }
  apiGetProducts(search).then((result) => {
    const products = result.data;
    // Khởi tạo đối tượng
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      products[i] = new Product(
        product.id,
        product.name,
        product.price,
        product.screen,
        product.backCamera,
        product.frontCamera,
        product.img,
        product.desc,
        product.type
      );
    }
    // render giao diện
    display(products);
  });
}

// Search product = nhấn vào biểu tượng kính lúp
function handleSearchByMouse() {
  const search = document.getElementById("product-search").value;
  apiGetProducts(search).then((result) => {
    const products = result.data;
    // Khởi tạo đối tượng
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      products[i] = new Product(
        product.id,
        product.name,
        product.price,
        product.screen,
        product.backCamera,
        product.frontCamera,
        product.img,
        product.desc,
        product.type
      );
    }
    // render giao diện
    display(products);
  });
}

// Handle click Giỏ hàng
document.querySelector(".cart").addEventListener("click", () => {
  // DOM
  const menu = document.querySelector(".menu-container");
  const cover = document.querySelector(".cover-page");
  // Logic
  if (window.innerWidth > 1200) {
    menu.style.width = "60%";
  } else if (window.innerWidth > 992) {
    menu.style.width = "70%";
  } else if (window.innerWidth > 768) {
    menu.style.width = "85%";
  } else {
    menu.style.width = "100%";
  }
  cover.style.display = "block";
  document.body.classList.add("stop-scroll");
});

document.querySelector(".quit-btn").addEventListener("click", () => {
  // DOM
  const menu = document.querySelector(".menu-container");
  const cover = document.querySelector(".cover-page");
  // Logic

  menu.style.width = "0";
  cover.style.display = "none";
  document.body.classList.remove("stop-scroll");
});

// Handle click outside to turn off menu
document.querySelector(".cover-page").addEventListener("click", (e) => {
  // DOM
  const menu = document.querySelector(".menu-container");
  const cover = document.querySelector(".cover-page");
  // Logic

  menu.style.width = "0";
  cover.style.display = "none";
  document.body.classList.remove("stop-scroll");
});

// Xử lý sự kiện khi click vào Thêm vào giỏ hàng khi bấm vào từng sản phẩm
// get data từ local storage
let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
function handleClickAdd(productId) {
  // CallAPI lấy ra sp theo ID
  apiGetProductDetail(productId).then((result) => {
    let product = result.data;
    product = new Product(
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

    const value = cartProducts.findIndex((cartProduct) => {
      return cartProduct.id === product.id;
    });
    if (value !== -1) {
      handleIncreaseCartProduct(product.id);
      // init();
      return;
    }
    // =========event 1: push sp vao cart
    // push sp vào cart
    cartProducts.push(product);
    // setLocal storage
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));

    // ========event 2: Total price trong cart
    handleCartProductsTotal(cartProducts);
    init();
  });
}

// Handle fixed header when scroll
document.onscroll = () => {
  const header = document.getElementById("header");
  if (window.scrollY > 200) {
    Object.assign(header.style, {
      position: "fixed",
      top: 0,
      zIndex: 1,
    });
  } else {
    Object.assign(header.style, {
      position: "relative",
    });
  }
};

// Handle khi click vào xem thêm sp
document.getElementById("more-products").addEventListener("click", () => {
  // DOM
  const container = document.querySelector(".main-content .container");
  const seeMore = document.querySelector(".see-more");
  // Logic
  container.style.maxHeight = "100%";
  seeMore.style.visibility = "hidden";
});
