class Property {
  id: number;
  name: string;
  price: number;
  description: string;
  imgUrl: string;
  constructor(
    id: number,
    name: string,
    price: number,
    description: string,
    imgUrl: string
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.imgUrl = imgUrl;
  }
}
export default Property;
