import Orders from "../model/orders.js"

export default class OrdersController{

    constructor(){
        this.arr =JSON.parse(localStorage.getItem("orders"));
        this.list=[];
        this.toObject();
    }

    toObject=()=>{
        this.arr.forEach(e => {
            this.list.push(new Orders(e.id,e.customer_id,e.ammount,e.order_address,e.order_date));
        });
    }

    reload=()=>{
        localStorage.setItem('orders',JSON.stringify(this.list));
    }

    create=(order)=>{
        this.list.push(order);

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

    updateCustomerId=(id,newCustomer_id)=>{
    
        let obj = this.getItemById(id);

        obj.customer_id = newCustomer_id;

        this.reload();
    }

    updateAmmountId=(id,newAmmount)=>{
    
        let obj = this.getItemById(id);

        obj.ammount = newAmmount;

        this.reload();
    }

    updateOrderAddress=(id,newOrderAddress)=>{
    
        let obj = this.getItemById(id);

        obj.order_address = newOrderAddress;

        this.reload();
    }

    updateOrderDate=(id,newOrderDate)=>{
    
        let obj = this.getItemById(id);

        obj.order_date = newOrderDate;

        this.reload();
    }
    
}