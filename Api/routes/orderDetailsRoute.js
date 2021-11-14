import express from "express"
import OrderDetailsRepository from "../repositories/OrderDetailsRepository.js";
import OrderDetails from "../models/order_details.js"

let orderDetailsRepository = new OrderDetailsRepository();

const orderDetailsRouter = express.Router();

orderDetailsRouter.get("/", async(req,res)=>{
    try{

        let orderDetails = await orderDetailsRepository.getAllOrderDetails();

        res.status(200).json(orderDetails);

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

orderDetailsRouter.get("/:id", async(req,res)=>{
    try{
        let {id} = req.params;
        let orderDetails = await orderDetailsRepository.getOrderDetailsById(id);
        
        if( orderDetails != null){
            res.status(200).json(orderDetails);
        }else{
            res.json(`OrderDetails cu ID-ul ${id} nu exista!`);
        }

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

orderDetailsRouter.post("/add", async(req,res)=>{
    try{
        let orderDetails = req.body;
        
        if(!orderDetails.id){
            res.status(400).json(`ID invalid!`);
        }
        else if(!orderDetails.order_id){
            res.status(400).json(`Order ID invalid!`);
        }
        else if(!orderDetails.product_id){
            res.status(400).json(`Product ID invalid!`);
        }
        else if(!orderDetails.price){
            res.status(400).json(`Price invalid!`);
        }
        else if(!orderDetails.quantity){
            res.status(400).json(`Quantity invalid!`);
        }
        else{
            let newOrderDetails = new OrderDetails(
                orderDetails.id,
                orderDetails.order_id,
                orderDetails.product_id,
                orderDetails.price,
                orderDetails.quantity,
                );

            orderDetailsRepository.addOrderDetails(newOrderDetails);
            
            res.status(200).json(`OrderDetails cu ID-ul ${orderDetails.id} a fost adaugata in baza de date!`);
        }

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

orderDetailsRouter.delete("/:id", async(req,res)=>{
    try{
        let {id} = req.params;

        let orderDetails = await orderDetailsRepository.getOrderDetailsById(id);

        if(orderDetails != null){
            await orderDetailsRepository.deleteOrderDetails(id);

            res.status(200).json(`OrderDetails cu ID-ul ${id} a fost eliminat din baza de date!`);
        }else{
            res.status(400).json(`OrderDetails cu ID-ul ${id} nu exista in baza de date!`);
        }


    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

orderDetailsRouter.put("/:id", async(req,res)=>{
    try{
        let {id} = req.params;
        let user = req.body;

        let orderDetails = await orderDetailsRepository.getOrderDetailsById(id);

        if(orderDetails != null){
            await orderDetailsRepository.updateOrderDetails(id,user);
            
            res.status(200).json(`Update success!`);
        }else{
            res.status(400).json('OrderDetails nu exista in baza de date!');
        }

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

export default orderDetailsRouter;