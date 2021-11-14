import fs from "fs"
import Options from "../models/option.js";

export default class OptionsRepository{

    save=(data)=>{
        return new Promise ((resolve,reject)=>{
              fs.writeFile('data_base/options.json',JSON.stringify(data,null,2),err=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve();
                    }
              })
        });
   }

    getAllOptions=()=>{
        return new Promise((resolve,reject)=>{
            fs.readFile('data_base/options.json','utf8',(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    const all=JSON.parse(data);
                    let list = [];

                    for(let obj of all){
                        let nou = new Options(
                            obj.id,
                            obj.option_name);

                        list.push(nou);
                    }
                    resolve(list);

                }
            });
        });
    }

    getOptionById = async (id)=>{
        try{
            const allOptions = await this.getAllOptions();

            for(let obj of allOptions){
                if(obj.id ==id){
                    return obj;
                }
            }
            
            return null;

        }catch(err){

            return err;
        }
       
    }

    addOption = async(option)=>{
        try{
            
            const allOptions = await this.getAllOptions();

            allOptions.push(option);

            this.save(allOptions);

            return allOptions;

        }catch(err){
            return err;
        }
    }

    deleteOption =async(id)=>{
        try{
            const allOptions = await this.getAllOptions();

            let newOptions = allOptions.filter(e=> e.id != id);

            this.save(newOptions);

            return newOptions;

        }catch(err){

            return err;
        }
    }

    updateOption = async(id,newOption)=>{
        try{
            const allOptions = await this.getAllOptions();

            for(let obj of allOptions){
                if(obj.id == id){
                    obj.option_name = newOption.option_name;
                }
            }

            this.save(allOptions);

            return newOption;

        }catch{
            return err;
        }
    }


}