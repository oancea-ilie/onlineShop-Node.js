import OrderDetails from "../model/order_details.js";

export default class OrderDetailsController{
    constructor(){
        this.arr =JSON.parse(localStorage.getItem("orderDetails"));
        this.list=[];
        this.toObject();
    }

    toObject=()=>{
        this.arr.forEach(e => {
            this.list.push(new OrderDetails(e.id,e.order_id,e.product_id,e.price,e.quantity));
        });
    }

    reload=()=>{
        localStorage.setItem('orderDetails',JSON.stringify(this.list));
    }

    create=(orderDetail)=>{
        this.list.push(orderDetail);

        this.reload();
    }

    delete=(id)=>{
        this.list = this.list.filter(e=>e.id!==id);

        this.reload();
    }

    getItemById=(id)=>{
        for(let i of this.list){
            if(i.id == id){
                return i;
            }
        }
    }

    updateOrderId=(id,newOrderId)=>{
    
        let obj = this.getItemById(id);

        obj.order_id = newOrderId;

        this.reload();
    }

    updateProductId=(id,newProductId)=>{
    
        let obj = this.getItemById(id);

        obj.product_id = newProductId;

        this.reload();
    }

    updatePrice=(id,newPrice)=>{
    
        let obj = this.getItemById(id);

        obj.price = newPrice;

        this.reload();
    }

    updateQuantity=(id,newQuantity)=>{
    
        let obj = this.getItemById(id);

        obj.quantity = newQuantity;

        this.reload();
    }

}