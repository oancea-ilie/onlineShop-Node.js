import express from "express"
import CustomersRepository from "../repositories/CustomersRepository.js";
import Customer from  "../models/customer.js"

let customersRepository = new CustomersRepository();

const customerRouter = express.Router();

customerRouter.get("/", async(req,res)=>{
    try{

        let customers = await customersRepository.getAllCustomers();

        res.status(200).json(customers);

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

customerRouter.get("/:id", async(req,res)=>{
    try{
        let {id} = req.params;
        let customer = await customersRepository.getCustomerById(id);
        
        if( customer != null){
            res.status(200).json(customer);
        }else{
            res.json(`Clientul cu ID-ul ${id} nu exista!`);
        }

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

customerRouter.post("/add", async(req,res)=>{
    try{
        let user = req.body;
        
        if(!user.id){
            res.status(400).json(`ID invalid!`);
        }
        else if(!user.name){
            res.status(400).json(`NAME invalid!`);
        }
        else if(!user.email){
            res.status(400).json(`EMAIL invalid!`);
        }
        else if(!user.password){
            res.status(400).json(`PASSWORD invalid!`);
        }
        else if(!user.billing_address){
            res.status(400).json(`BILLING ADRESS invalid!`);
        }
        else if(!user.phone){
            res.status(400).json(`PHONE invalid!`);
        }
        else{
            
            let customer = new Customer(user.id,user.name,user.email,user.password,user.billing_address,user.phone);

            customersRepository.addCustomer(customer);
            
            res.status(200).json(`persoana ${user.name} a fost adaugata in baza de date!`);
        }

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

customerRouter.delete("/:id", async(req,res)=>{
    try{
        let {id} = req.params;

        let customer = await customersRepository.getCustomerById(id);

        if(customer != null){
            await customersRepository.deleteCustomer(id);

            res.status(200).json(`Clientul cu ID-ul ${id} a fost eliminat din baza de date!`);
        }else{
            res.status(400).json(`Clientul cu ID-ul ${id} nu exista in baza de date!`);
        }


    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

customerRouter.put("/:id", async(req,res)=>{
    try{
        let {id} = req.params;
        let user = req.body;

        let customer = await customersRepository.getCustomerById(id);

        if(customer != null){
            await customersRepository.updateCustomer(id,user);
            
            res.status(200).json(`Update success!`);
        }else{
            res.status(400).json('Clientul nu exista in baza de date!');
        }

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

export default customerRouter;