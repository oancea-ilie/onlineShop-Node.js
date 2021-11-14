import express from "express"
import ProductsRepository from "../repositories/ProductsRepository.js"
import Product from "../models/product.js"


let productsRepository = new ProductsRepository();

const productsRouter = express.Router();

productsRouter.get("/", async(req,res)=>{
    try{

        let allProducts = await productsRepository.getAllProducts();

        res.status(200).json(allProducts);

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

productsRouter.get("/:id", async(req,res)=>{
    try{
        let {id} = req.params;

        let product = await productsRepository.getProductById(id);
        
        if( product != null){
            res.status(200).json(product);
        }else{
            res.json(`Product cu ID-ul ${id} nu exista!`);
        }

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

productsRouter.post("/add", async(req,res)=>{
    try{
        let product = req.body;
        
        if(!product.id){
            res.status(400).json(`ID invalid!`);
        }
        else if(!product.name){
            res.status(400).json(`Product NAME invalid!`);
        }
        else if(!product.price){
            res.status(400).json(`Product PRICE invalid!`);
        }
        else if(!product.description){
            res.status(400).json(`Product DESCRIPTION invalid!`);
        }
        else if(!product.image){
            res.status(400).json(`Product IMAGE invalid!`);
        }
        else if(!product.category){
            res.status(400).json(`Product CATEGORY invalid!`);
        }
        else if(!product.create_date){
            res.status(400).json(`Product CREATE DATE invalid!`);
        }
        else if(!product.stock){
            res.status(400).json(`Product STOCK invalid!`);
        }
        else if(product.favariteStatus == null){
            res.status(400).json(`Product FAVORITE STATUS invalid!`);
        }
        else if(!product.cartStatus == null){
            res.status(400).json(`Product CART STATUS invalid!`);
        }
        else{
            let newProduct = new Product(
                product.id,
                product.name,
                product.price,
                product.description,
                product.image,
                product.category,
                product.create_date,
                product.stock,
                product.favariteStatus,
                product.cartStatus,
                );

                productsRepository.addProduct(newProduct);
            
            res.status(200).json(`Product cu ID-ul ${newProduct.id} a fost adaugata in baza de date!`);
        }

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

productsRouter.delete("/:id", async(req,res)=>{
    try{
        let {id} = req.params;

        let product = await productsRepository.getProductById(id);

        if(product != null){
            await productsRepository.deleteProduct(id);

            res.status(200).json(`Product cu ID-ul ${id} a fost eliminat din baza de date!`);
        }else{
            res.status(400).json(`Product cu ID-ul ${id} nu exista in baza de date!`);
        }


    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

productsRouter.put("/:id", async(req,res)=>{
    try{
        let {id} = req.params;
        let user = req.body;

        let product = await productsRepository.getProductById(id);

        if(product != null){
            await productsRepository.updateProduct(id,user);
            
            res.status(200).json(`Update success!`);
        }else{
            res.status(400).json('Product Category nu exista in baza de date!');
        }

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

export default productsRouter;