const baseURL = "https://62b47263530b26da4cbebae9.mockapi.io/cellphones";

// GET API
function apiGetProducts(search) {
  return axios({
    url: baseURL,
    method: "GET",
    params: {
      name: search,
    },
  });
}

//  GET API theo ID
function apiGetProductDetail(productId) {
  return axios({
    url: `${baseURL}/${productId}`,
    method: "GET",
  });
}

// Hàm call API thêm sản phẩm
function apiAddProduct(product) {
  return axios({
    url: baseURL,
    method: "POST",
    data: product,
  });
}

// Hàm call API xoá sản phẩm
function apiDeleteProduct(productId) {
  return axios({
    url: `${baseURL}/${productId}`,
    method: "DELETE",
  });
}

// update product
function apiUpdateProduct(product) {
  return axios({
    url: `${baseURL}/${product.id}`,
    data: product,
    method: "PUT",
  });
}
