class Product {
  constructor(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type,
    quantity = 1
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.screen = screen;
    this.backCamera = backCamera;
    this.frontCamera = frontCamera;
    this.img = img;
    this.desc = desc;
    this.type = type;
    this.quantity = quantity;
  }

  getLogo() {
    if (this.type.toLowerCase() === "iphone") {
      return "apple";
    } else if (this.type.toLowerCase() === "samsung") {
      return "samsung";
    } else if (this.type.toLowerCase() === "oppo") {
      return "oppo";
    }
  }

  getPrice() {
    return this.price * this.quantity;
  }
}
