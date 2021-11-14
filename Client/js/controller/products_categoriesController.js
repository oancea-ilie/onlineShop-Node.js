import ProductCategories from "../model/product_categories.js";


export default class ProductsCategoriesController{
    constructor(){
        this.arr =JSON.parse(localStorage.getItem("productsCategories"));
        this.list=[];
        this.toObject();
    }

    toObject=()=>{
        this.arr.forEach(e => {
            this.list.push(new ProductCategories(e.id,e.product_id,e.category_id));
        });
    }

    reload=()=>{
        localStorage.setItem('productsCategories',JSON.stringify(this.list));
    }

    create=(ProductCategories)=>{

        this.list.push(ProductCategories);

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

    updateProductId=(id,newProductId)=>{
    
        let obj = this.getItemById(id);

        obj.product_id = newProductId;

        this.reload();
    }

    updateCategoryId=(id,newCategory_id)=>{
    
        let obj = this.getItemById(id);

        obj.category_id = newCategory_id;

        this.reload();
    }

}