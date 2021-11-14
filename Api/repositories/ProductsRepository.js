import fs from "fs"
import Product from "../models/product.js";

export default class ProductsRepository{

    save=(data)=>{
        return new Promise ((resolve,reject)=>{
              fs.writeFile('data_base/products.json',JSON.stringify(data,null,2),err=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve();
                    }
              })
        });
   }

    getAllProducts=()=>{
        return new Promise((resolve,reject)=>{
            fs.readFile('data_base/products.json','utf8',(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    const all=JSON.parse(data);
                    let list = [];

                    for(let obj of all){
                        let nou = new Product(
                            obj.id,
                            obj.name,
                            obj.price,
                            obj.description,
                            obj.image,
                            obj.category,
                            obj.stock,
                            obj.favariteStatus,
                            obj.cartStatus);

                        list.push(nou);
                    }
                    resolve(list);

                }
            });
        });
    }

    getProductById = async (id)=>{
        try{
            const allProducts = await this.getAllProducts();

            for(let obj of allProducts){
                if(obj.id ==id){
                    return obj;
                }
            }
            
            return null;

        }catch(err){

            return err;
        }
       
    }

    addProduct = async(product)=>{
        try{
            
            const allProducts = await this.getAllProducts();

            allProducts.push(product);

            this.save(allProducts);

            return allProducts;

        }catch(err){
            return err;
        }
    }

    deleteProduct =async(id)=>{
        try{
            const allProducts = await this.getAllProducts();

            let newProducts = allProducts.filter(e=> e.id != id);

            this.save(newProducts);

            return newProducts;

        }catch(err){

            return err;
        }
    }

    updateProduct = async(id,newProduct)=>{
        try{
            const allProducts = await this.getAllProducts();

            for(let obj of allProducts){
                if(obj.id == id){
                    obj.name = newProduct.name;
                    obj.price = newProduct.price;
                    obj.description = newProduct.description;
                    obj.image = newProduct.image;
                    obj.category = newProduct.category;
                    obj.create_date = newProduct.create_date;
                    obj.stock = newProduct.stock;
                    obj.favariteStatus = newProduct.favariteStatus;
                    obj.cartStatus = newProduct.cartStatus;
                }
            }

            this.save(allProducts);

            return newProduct;

        }catch{
            return err;
        }
    }

}