import express from "express"
import OrdersRepository from "../repositories/OrdersRepository.js";
import Order from "../models/order.js"

let orderRepository = new OrdersRepository();

const orderRouter = express.Router();

orderRouter.get("/", async(req,res)=>{
    try{

        let allOrders = await orderRepository.getAllOrders();

        res.status(200).json(allOrders);

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

orderRouter.get("/:id", async(req,res)=>{
    try{
        let {id} = req.params;
        let order = await orderRepository.getOrderById(id);
        
        if( order != null){
            res.status(200).json(order);
        }else{
            res.json(`Order cu ID-ul ${id} nu exista!`);
        }

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

orderRouter.post("/add", async(req,res)=>{
    try{
        let order = req.body;
        
        if(!order.id){
            res.status(400).json(`ID invalid!`);
        }
        else if(!order.customer_id){
            res.status(400).json(`Customer ID invalid!`);
        }
        else if(!order.ammount){
            res.status(400).json(`Ammount ID invalid!`);
        }
        else if(!order.order_address){
            res.status(400).json(`Adress invalid!`);
        }
        else if(!order.order_date){
            res.status(400).json(`Date invalid!`);
        }
        else{
            let newOrder = new Order(
                order.id,
                order.customer_id,
                order.ammount,
                order.order_address,
                order.order_date,
                );

                orderRepository.addOrder(newOrder);
            
            res.status(200).json(`Order cu ID-ul ${order.id} a fost adaugata in baza de date!`);
        }

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

orderRouter.delete("/:id", async(req,res)=>{
    try{
        let {id} = req.params;

        let order = await orderRepository.getOrderById(id);

        if(order != null){
            await orderRepository.deleteOrder(id);

            res.status(200).json(`Order cu ID-ul ${id} a fost eliminat din baza de date!`);
        }else{
            res.status(400).json(`Order cu ID-ul ${id} nu exista in baza de date!`);
        }


    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

orderRouter.put("/:id", async(req,res)=>{
    try{
        let {id} = req.params;
        let user = req.body;

        let order = await orderRepository.getOrderById(id);

        if(order != null){
            await orderRepository.updateOrder(id,user);
            
            res.status(200).json(`Update success!`);
        }else{
            res.status(400).json('Order nu exista in baza de date!');
        }

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

export default orderRouter;