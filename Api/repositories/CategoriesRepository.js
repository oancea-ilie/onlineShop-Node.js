import Category from "../models/category.js";
import fs from "fs"


export default class CategoriesRepository{

    save=(data)=>{
        return new Promise ((resolve,reject)=>{
              fs.writeFile('data_base/categories.json',JSON.stringify(data,null,2),err=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve();
                    }
              })
        });
   }

    getAllCategoires=()=>{
        return new Promise((resolve,reject)=>{
            fs.readFile('data_base/categories.json','utf8',(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    const all=JSON.parse(data);
                    let list = [];

                    for(let obj of all){
                        let nou = new Category(
                            obj.id,
                            obj.name,
                            obj.description,
                            obj.image
                            );

                        list.push(nou);
                    }
                    resolve(list);

                }
            });
        });
    }

    getCategoryById = async (id)=>{
        try{
            const categories = await this.getAllCategoires();

            for(let obj of categories){
                if(obj.id ==id){
                    return obj;
                }
            }
            
            return null;

        }catch(err){

            return err;
        }
       
    }

    addCategory = async(category)=>{
        try{
            
            const categories = await this.getAllCategoires();

            categories.push(category);

            this.save(categories);

            return categories;

        }catch(err){
            return err;
        }
    }

    deleteCategory =async(id)=>{
        try{
            const categories = await this.getAllCategoires();

            let newCategory = categories.filter(e=> e.id != id);

            this.save(newCategory);

            return newCategory;

        }catch(err){

            return err;
        }
    }

    updateCategory = async(id,newCategory)=>{
        try{
            const categories = await this.getAllCategoires();

            for(let obj of categories){
                if(obj.id == id){
                    obj.name = newCategory.name;
                    obj.description = newCategory.description;
                    obj.image = newCategory.image;
                }
            }

            this.save(categories);

            return newCategory;

        }catch{
            return err;
        }
    }


}