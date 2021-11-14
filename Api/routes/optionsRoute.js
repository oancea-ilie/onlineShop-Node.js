import express from "express"
import OptionsRepository from "../repositories/OptionsRepository.js"
import Option from "../models/option.js"


let optionsRepository = new OptionsRepository();

const optionsRouter = express.Router();

optionsRouter.get("/", async(req,res)=>{
    try{

        let options = await optionsRepository.getAllOptions();

        res.status(200).json(options);

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

optionsRouter.get("/:id", async(req,res)=>{
    try{
        let {id} = req.params;
        let option = await optionsRepository.getOptionById(id);
        
        if( option != null){
            res.status(200).json(option);
        }else{
            res.json(`Optiunea cu ID-ul ${id} nu exista!`);
        }

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

optionsRouter.post("/add", async(req,res)=>{
    try{
        let option = req.body;
        
        if(!option.id){
            res.status(400).json(`ID invalid!`);
        }
        else if(!option.option_name){
            res.status(400).json(`Option Name invalid!`);
        }
        else{
            let newOption = new Option(option.id,option.option_name);

            optionsRepository.addOption(newOption);
            
            res.status(200).json(`Optiunea ${option.option_name} a fost adaugata in baza de date!`);
        }

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

optionsRouter.delete("/:id", async(req,res)=>{
    try{
        let {id} = req.params;

        let option = await optionsRepository.getOptionById(id);

        if(option != null){
            await optionsRepository.deleteOption(id);

            res.status(200).json(`Optiunea cu ID-ul ${id} a fost eliminat din baza de date!`);
        }else{
            res.status(400).json(`Optiunea cu ID-ul ${id} nu exista in baza de date!`);
        }


    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

optionsRouter.put("/:id", async(req,res)=>{
    try{
        let {id} = req.params;
        let user = req.body;

        let option = await optionsRepository.getOptionById(id);

        if(option != null){
            await optionsRepository.updateOption(id,user);
            
            res.status(200).json(`Update success!`);
        }else{
            res.status(400).json('Optiunea nu exista in baza de date!');
        }

    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});

export default optionsRouter;