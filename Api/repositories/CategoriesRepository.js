export default class CategoriesRepository{

    save=(data)=>{
        return new Promise ((resolve,reject)=>{
              fs.writeFile('data_base/customers.json',JSON.stringify(data,null,2),err=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve();
                    }
              })
        });
   }
}