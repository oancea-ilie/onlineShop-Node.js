import fs from "fs"
import ProductOptions from "../models/product_options.js";

export default class ProductOptionsRepository{

    save=(data)=>{
        return new Promise ((resolve,reject)=>{
              fs.writeFile('data_base/productOptions.json',JSON.stringify(data,null,2),err=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve();
                    }
              })
        });
   }

    getAllProductOptions=()=>{
        return new Promise((resolve,reject)=>{
            fs.readFile('data_base/productOptions.json','utf8',(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    const all=JSON.parse(data);
                    let list = [];

                    for(let obj of all){
                        let nou = new ProductOptions(
                            obj.id,
                            obj.option_id,
                            obj.product_id);

                        list.push(nou);
                    }
                    resolve(list);

                }
            });
        });
    }

    getProductOptionById = async (id)=>{
        try{
            const allProductOptions = await this.getAllProductOptions();

            for(let obj of allProductOptions){
                if(obj.id ==id){
                    return obj;
                }
            }
            
            return null;

        }catch(err){

            return err;
        }
       
    }

    addProductOption = async(productOption)=>{
        try{
            
            const allProductOptions = await this.getAllProductOptions();

            allProductOptions.push(productOption);

            this.save(allProductOptions);

            return allProductOptions;

        }catch(err){
            return err;
        }
    }

    deleteProductOption =async(id)=>{
        try{
            const allProductOptions = await this.getAllProductOptions();

            let newProductOptions = allProductOptions.filter(e=> e.id != id);

            this.save(newProductOptions);

            return newProductOptions;

        }catch(err){

            return err;
        }
    }

    updateProductOption = async(id,newProductOption)=>{
        try{
            const allProductOptions = await this.getAllProductOptions();

            for(let obj of allProductOptions){
                if(obj.id == id){
                    obj.option_id = newProductOption.option_id;
                    obj.product_id = newProductOption.product_id;
                }
            }

            this.save(allProductOptions);

            return newProductOption;

        }catch{
            return err;
        }
    }

}