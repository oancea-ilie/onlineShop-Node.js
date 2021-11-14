import Customers from "../model/customers.js";

export default class CustomersController{
    constructor(){
        // this.restore();
        this.arr =JSON.parse(localStorage.getItem("customers"));
        this.list=[];
        this.toObject();

    }

    toObject=()=>{
        this.arr.forEach(e => {
            this.list.push(new Customers(e.id,e.name,e.email,e.password,e.billing_address,e.phone));
        });
    }

    restore=()=>{
        let obj = new Customers(1,'restore','restore','restore','restore','restore');
        this.list = [];
        this.list.push(obj);
        this.reload();
    }

    reload=()=>{
        localStorage.setItem('customers',JSON.stringify(this.list));
    }

    create=(obj)=>{
        this.list.push(obj);

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

    updateName=(id,newName)=>{
    
        let obj = this.getItemById(id);

        obj.name = newName;

        this.reload();
    }

    updateEmail=(id,newEmail)=>{
    
        let obj = this.getItemById(id);

        obj.email = newEmail;

        this.reload();
    }

    updatePassword=(id,newPassword)=>{
    
        let obj = this.getItemById(id);

        obj.password = newPassword;

        this.reload();
    }
   
    updateBillingAddress=(id,newBillingAddress)=>{
    
        let obj = this.getItemById(id);

        obj.billing_address = newBillingAddress;

        this.reload();
    }

    updatePhone=(id,newPhone)=>{
    
        let obj = this.getItemById(id);

        obj.phone = newPhone;

        this.reload();
    }


}