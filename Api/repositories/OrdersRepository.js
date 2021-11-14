import fs from "fs"
import Order from "../models/order.js";

export default class OrdersRepository{

    save=(data)=>{
        return new Promise ((resolve,reject)=>{
              fs.writeFile('data_base/orders.json',JSON.stringify(data,null,2),err=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve();
                    }
              })
        });
   }

    getAllOrders=()=>{
        return new Promise((resolve,reject)=>{
            fs.readFile('data_base/orders.json','utf8',(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    const all=JSON.parse(data);
                    let list = [];

                    for(let obj of all){
                        let nou = new Order(
                            obj.id,
                            obj.customer_id,
                            obj.ammount,
                            obj.order_address,
                            obj.order_date);

                        list.push(nou);
                    }
                    resolve(list);

                }
            });
        });
    }

    getOrderById = async (id)=>{
        try{
            const allOrders = await this.getAllOrders();

            for(let obj of allOrders){
                if(obj.id ==id){
                    return obj;
                }
            }
            
            return null;

        }catch(err){

            return err;
        }
       
    }

    addOrder = async(order)=>{
        try{
            
            const allOrders = await this.getAllOrders();

            allOrders.push(order);

            this.save(allOrders);

            return allOrders;

        }catch(err){
            return err;
        }
    }

    deleteOrder =async(id)=>{
        try{
            const allOrders = await this.getAllOrders();

            let newOrders = allOrders.filter(e=> e.id != id);

            this.save(newOrders);

            return newOrders;

        }catch(err){

            return err;
        }
    }

    updateOrder = async(id,newOrder)=>{
        try{
            const allOrders = await this.getAllOrders();

            for(let obj of allOrders){
                if(obj.id == id){
                    obj.customer_id = newOrder.customer_id;
                    obj.ammount = newOrder.ammount;
                    obj.order_address = newOrder.order_address;
                    obj.order_date = newOrder.order_date;
                }
            }

            this.save(allOrders);

            return newOrder;

        }catch{
            return err;
        }
    }

}