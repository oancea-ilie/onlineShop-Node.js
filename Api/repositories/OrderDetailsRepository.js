import fs from "fs"
import OrderDetails from "../models/order_details.js";

export default class OrderDetailsRepository{

    save=(data)=>{
        return new Promise ((resolve,reject)=>{
              fs.writeFile('data_base/orderDetails.json',JSON.stringify(data,null,2),err=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve();
                    }
              })
        });
   }

    getAllOrderDetails=()=>{
        return new Promise((resolve,reject)=>{
            fs.readFile('data_base/orderDetails.json','utf8',(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    const all=JSON.parse(data);
                    let list = [];

                    for(let obj of all){
                        let nou = new OrderDetails(
                            obj.id,
                            obj.order_id,
                            obj.product_id,
                            obj.price,
                            obj.quantity);

                        list.push(nou);
                    }
                    resolve(list);

                }
            });
        });
    }

    getOrderDetailsById = async (id)=>{
        try{
            const allOrderDetails = await this.getAllOrderDetails();

            for(let obj of allOrderDetails){
                if(obj.id ==id){
                    return obj;
                }
            }
            
            return null;

        }catch(err){

            return err;
        }
       
    }

    addOrderDetails = async(orderDetails)=>{
        try{
            
            const allOrderDetails = await this.getAllOrderDetails();

            allOrderDetails.push(orderDetails);

            this.save(allOrderDetails);

            return allOrderDetails;

        }catch(err){
            return err;
        }
    }

    deleteOrderDetails =async(id)=>{
        try{
            const allOrderDetails = await this.getAllOrderDetails();

            let newOrderDetails = allOrderDetails.filter(e=> e.id != id);

            this.save(newOrderDetails);

            return newOrderDetails;

        }catch(err){

            return err;
        }
    }

    updateOrderDetails = async(id,newOrderDetails)=>{
        try{
            const allOrderDetails = await this.getAllOrderDetails();

            for(let obj of allOrderDetails){
                if(obj.id == id){
                    obj.order_id = newOrderDetails.order_id;
                    obj.product_id = newOrderDetails.product_id;
                    obj.price = newOrderDetails.price;
                    obj.quantity = newOrderDetails.quantity;
                }
            }

            this.save(allOrderDetails);

            return newOrderDetails;

        }catch{
            return err;
        }
    }


}