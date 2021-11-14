
export default class Orders{
    constructor(id,customer_id,ammount,order_address,order_date){
        this.id = id;
        this.customer_id = customer_id;
        this.ammount = ammount;
        this.order_address = order_address;
        this.order_date = order_date;
    }
}