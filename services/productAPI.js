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
function apiGetProductId(productId) {
  return axios({
    url: `${baseURL}/${productId}`,
    method: "GET",
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
