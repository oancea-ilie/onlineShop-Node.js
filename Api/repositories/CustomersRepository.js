import fs from "fs"
import Customer from "../models/customer.js"

export default class CustomersRepository{

    save=(data)=>{
        return new Promise ((resolve,reject)=>{
              fs.writeFile('data_base/customers.json',JSON.stringify(data,null,2),err=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve();
                    }
              })
        });
   }

   getAllCustomers=()=>{

        return new Promise((resolve,reject)=>{
            fs.readFile('data_base/customers.json','utf8',(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    const all=JSON.parse(data);
                    let list = [];

                    for(let obj of all){
                        let nou = new Customer(
                            obj.id,
                            obj.name,
                            obj.email,
                            obj.password,
                            obj.billing_address,
                            obj.phone);

                        list.push(nou);
                    }
                    resolve(list);

                }
            });
        });
    }

    getCustomerById= async (id)=>{
        try{
            const customers = await this.getAllCustomers();

            for(let obj of customers){
                if(obj.id ==id){
                    return obj;
                }
            }
            
            return null;

        }catch(err){

            return err;
        }
       
    }
    
    addCustomer = async(customer)=>{
        try{
            
            const customers = await this.getAllCustomers();

            customers.push(customer);

            this.save(customers);

            return customers;

        }catch(err){
            return err;
        }
    }

    deleteCustomer =async(id)=>{
        try{
            const customers = await this.getAllCustomers();

            let newCustomers = customers.filter(e=> e.id != id);

            this.save(newCustomers);

            return newCustomers;

        }catch(err){

            return err;
        }
    }

    updateCustomer  =async(id,newCustomer)=>{
        try{
            const customers = await this.getAllCustomers();

            for(let obj of customers){
                if(obj.id == id){
                    obj.name = newCustomer.name;
                    obj.email = newCustomer.email;
                    obj.password = newCustomer.password;
                    obj.billing_address = newCustomer.billing_address;
                    obj.phone = newCustomer.phone;
                }
            }

            this.save(customers);

            return newCustomer;

        }catch{
            return err;
        }
    }

}