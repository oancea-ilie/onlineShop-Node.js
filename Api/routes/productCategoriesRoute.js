import express from "express"
import ProductCategoriesRepository from "../repositories/ProductCategoriesRepository.js"
import ProductCategory from "../models/product_category.js"


let productCategoriesRepository = new ProductCategoriesRepository();

const productCategoriesRouter = express.Router();

productCategoriesRouter.get("/", async(req,res)=>{
    try{

        let allProductCategories = await productCategoriesRepository.getAllProductCategories();

        res.status(200).json(allProductCategories);

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

productCategoriesRouter.get("/:id", async(req,res)=>{
    try{
        let {id} = req.params;
        let productCategory = await productCategoriesRepository.getProductCategoryById(id);
        
        if( productCategory != null){
            res.status(200).json(productCategory);
        }else{
            res.json(`Product Category cu ID-ul ${id} nu exista!`);
        }

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

productCategoriesRouter.post("/add", async(req,res)=>{
    try{
        let productCategory = req.body;
        
        if(!productCategory.id){
            res.status(400).json(`ID invalid!`);
        }
        else if(!productCategory.product_id){
            res.status(400).json(`Product ID invalid!`);
        }
        else if(!productCategory.category_id){
            res.status(400).json(`Category ID invalid!`);
        }
        else{
            let newProductCategory = new ProductCategory(
                productCategory.id,
                productCategory.product_id,
                productCategory.category_id,
                );

                productCategoriesRepository.addProductCategory(newProductCategory);
            
            res.status(200).json(`Product Category cu ID-ul ${productCategory.id} a fost adaugata in baza de date!`);
        }

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

productCategoriesRouter.delete("/:id", async(req,res)=>{
    try{
        let {id} = req.params;

        let productCategory = await productCategoriesRepository.getProductCategoryById(id);

        if(productCategory != null){
            await productCategoriesRepository.deleteProductCategory(id);

            res.status(200).json(`Product Category cu ID-ul ${id} a fost eliminat din baza de date!`);
        }else{
            res.status(400).json(`Product Category cu ID-ul ${id} nu exista in baza de date!`);
        }


    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

productCategoriesRouter.put("/:id", async(req,res)=>{
    try{
        let {id} = req.params;
        let user = req.body;

        let productCategory = await productCategoriesRepository.getProductCategoryById(id);

        if(productCategory != null){
            await productCategoriesRepository.updateProductCategory(id,user);
            
            res.status(200).json(`Update success!`);
        }else{
            res.status(400).json('Product Category nu exista in baza de date!');
        }

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

export default productCategoriesRouter;