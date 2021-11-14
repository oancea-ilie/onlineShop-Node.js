import express from "express"
import ProductOptionsRepository from "../repositories/ProductOptionsRepository.js";
import ProductOptions from "../models/product_options.js"


let productOptionsRepository = new ProductOptionsRepository();

const productOptionsRouter = express.Router();

productOptionsRouter.get("/", async(req,res)=>{
    try{

        let allProductOptions = await productOptionsRepository.getAllProductOptions();

        res.status(200).json(allProductOptions);

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

productOptionsRouter.get("/:id", async(req,res)=>{
    try{
        let {id} = req.params;

        let productOption = await productOptionsRepository.getProductOptionById(id);
        
        if( productOption != null){
            res.status(200).json(productOption);
        }else{
            res.json(`Product Option cu ID-ul ${id} nu exista!`);
        }

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

productOptionsRouter.post("/add", async(req,res)=>{
    try{
        let productOption = req.body;
        
        if(!productOption.id){
            res.status(400).json(`ID invalid!`);
        }
        else if(!productOption.option_id){
            res.status(400).json(`Option ID invalid!`);
        }
        else if(!productOption.product_id){
            res.status(400).json(`Product ID invalid!`);
        }
        else{
            let newProductOption = new ProductOptions(
                productOption.id,
                productOption.option_id,
                productOption.product_id,
                );

                productOptionsRepository.addProductOption(newProductOption);
            
            res.status(200).json(`Product Option cu ID-ul ${newProductOption.id} a fost adaugata in baza de date!`);
        }

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

productOptionsRouter.delete("/:id", async(req,res)=>{
    try{
        let {id} = req.params;

        let productOption = await productOptionsRepository.getProductOptionById(id);

        if(productOption != null){
            await productOptionsRepository.deleteProductOption(id);

            res.status(200).json(`Product Option cu ID-ul ${id} a fost eliminat din baza de date!`);
        }else{
            res.status(400).json(`Product Option cu ID-ul ${id} nu exista in baza de date!`);
        }


    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

productOptionsRouter.put("/:id", async(req,res)=>{
    try{
        let {id} = req.params;
        let user = req.body;

        let productOption = await productOptionsRepository.getProductOptionById(id);

        if(productOption != null){
            await productOptionsRepository.updateProductOption(id,user);
            
            res.status(200).json(`Update success!`);
        }else{
            res.status(400).json('Product Category nu exista in baza de date!');
        }

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

export default productOptionsRouter;