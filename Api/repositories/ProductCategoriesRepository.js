import fs from "fs"
import ProductCategory from "../models/product_category.js";

export default class ProductCategoriesRepository{

    save=(data)=>{
        return new Promise ((resolve,reject)=>{
              fs.writeFile('data_base/productCategories.json',JSON.stringify(data,null,2),err=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve();
                    }
              })
        });
   }

    getAllProductCategories=()=>{
        return new Promise((resolve,reject)=>{
            fs.readFile('data_base/productCategories.json','utf8',(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    const all=JSON.parse(data);
                    let list = [];

                    for(let obj of all){
                        let nou = new ProductCategory(
                            obj.id,
                            obj.product_id,
                            obj.category_id);

                        list.push(nou);
                    }
                    resolve(list);

                }
            });
        });
    }

    getProductCategoryById = async (id)=>{
        try{
            const allProductCategories = await this.getAllProductCategories();

            for(let obj of allProductCategories){
                if(obj.id ==id){
                    return obj;
                }
            }
            
            return null;

        }catch(err){

            return err;
        }
       
    }

    addProductCategory = async(productCategory)=>{
        try{
            
            const allProductCategories = await this.getAllProductCategories();

            allProductCategories.push(productCategory);

            this.save(allProductCategories);

            return allProductCategories;

        }catch(err){
            return err;
        }
    }

    deleteProductCategory =async(id)=>{
        try{
            const allProductCategories = await this.getAllProductCategories();

            let newProductCategories = allProductCategories.filter(e=> e.id != id);

            this.save(newProductCategories);

            return newProductCategories;

        }catch(err){

            return err;
        }
    }

    updateProductCategory = async(id,newProductCategory)=>{
        try{
            const allProductCategories = await this.getAllProductCategories();

            for(let obj of allProductCategories){
                if(obj.id == id){
                    obj.product_id = newProductCategory.product_id;
                    obj.category_id = newProductCategory.category_id;
                }
            }

            this.save(allProductCategories);

            return newProductCategory;

        }catch{
            return err;
        }
    }

}