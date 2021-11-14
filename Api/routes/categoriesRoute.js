import express from "express"
import CategoriesRepository from "../repositories/CategoriesRepository.js"
import Category from "../models/category.js"

let categoriesRepository = new CategoriesRepository();

const categoriesRouter = express.Router();

categoriesRouter.get("/", async(req,res)=>{
    try{

        let categories = await categoriesRepository.getAllCategoires();

        res.status(200).json(categories);

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

categoriesRouter.get("/:id", async(req,res)=>{
    try{
        let {id} = req.params;
        let category = await categoriesRepository.getCategoryById(id);
        
        if( category != null){
            res.status(200).json(category);
        }else{
            res.json(`Categoria cu ID-ul ${id} nu exista!`);
        }

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

categoriesRouter.post("/add", async(req,res)=>{
    try{
        let category = req.body;
        
        if(!category.id){
            res.status(400).json(`ID invalid!`);
        }
        else if(!category.name){
            res.status(400).json(`NAME invalid!`);
        }
        else if(!category.description){
            res.status(400).json(`DESCRIPTION invalid!`);
        }
        else if(!category.image){
            res.status(400).json(`IMAGE invalid!`);
        }
        else{
            
            let  newCategory = new Category(category.id,category.name,category.description,category.image);

            categoriesRepository.addCategory(newCategory);
            
            res.status(200).json(`Categoria ${category.name} a fost adaugata in baza de date!`);
        }

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

categoriesRouter.delete("/:id", async(req,res)=>{
    try{
        let {id} = req.params;

        let category = await categoriesRepository.getCategoryById(id);

        if(category != null){
            await categoriesRepository.deleteCategory(id);

            res.status(200).json(`Categoria cu ID-ul ${id} a fost eliminat din baza de date!`);
        }else{
            res.status(400).json(`Categoria cu ID-ul ${id} nu exista in baza de date!`);
        }


    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

categoriesRouter.put("/:id", async(req,res)=>{
    try{
        let {id} = req.params;
        let user = req.body;

        let category = await categoriesRepository.getCategoryById(id);

        if(category != null){
            await categoriesRepository.updateCategory(id,user);
            
            res.status(200).json(`Update success!`);
        }else{
            res.status(400).json('Categoria nu exista in baza de date!');
        }

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

export default categoriesRouter;