

export default class OrderDetails{
    constructor (id,order_id,product_id,price,quantity){
        this.id = id;
        this.order_id = order_id;
        this.product_id = product_id;
        this.price = price;
        this.quantity = quantity;
    }
}