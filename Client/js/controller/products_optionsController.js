import ProductOptions from "../model/product_options.js";

export default class ProductsOptionsController{
    constructor(){
        this.arr =JSON.parse(localStorage.getItem("productsOptions"));
        this.list=[];
        this.toObject();
    }

    toObject=()=>{

        this.arr.forEach(e => {

            this.list.push(new ProductOptions(e.id,e.option_id,e.product_id));
            
        });

    }

    reload=()=>{
        localStorage.setItem('productsOptions',JSON.stringify(this.list));
    }

    create=(productOption)=>{

        this.list.push(productOption);

        this.reload();
    }

    delete=(id)=>{
        this.list = this.list.filter(e=>e.id!==id);

        this.reload();
    }

    getItemById=(id)=>{
        for(let i of this.list){
            if(i.id == id){
                return i;
            }
        }
    }

    updateOptionId=(id,newOptionId)=>{
    
        let obj = this.getItemById(id);

        obj.option_id = newOptionId;

        this.reload();
    }

    updateProductId=(id,newProduct_id)=>{
    
        let obj = this.getItemById(id);

        obj.product_id = newProduct_id;

        this.reload();
    }

}