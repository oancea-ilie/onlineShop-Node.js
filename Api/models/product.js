
export default class Product{
    constructor(id,name,price,description,image,category,create_date,stock,favoriteStatus,cartStatus){
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
        this.category = category;
        this.create_date = create_date;
        this.stock = stock;
        this.favariteStatus = favoriteStatus;
        this.cartStatus = cartStatus;
    }

    
}