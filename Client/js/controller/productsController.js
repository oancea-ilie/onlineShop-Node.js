import Product from "../model/product.js"

export default class ProductsController{
    constructor(){
        this.arr =JSON.parse(localStorage.getItem("products"));
        this.list=[];
        this.toProducts();
        this.categorii = document.querySelectorAll(".main-categorie");

    }

    toProducts=()=>{

        this.arr.forEach(e => {

            this.list.push(new Product(e.id,e.name,e.price,e.description,e.image,e.category,e.create_date,e.stock,e.favariteStatus,e.cartStatus));
            
        });

    }

    restore=()=>{
        let obj = new Product(0,'restore','restore','restore','restore','restore','restore','restore',0,0);
        this.list = [];
        this.create(obj);
    }

    reload=()=>{
        localStorage.setItem('products',JSON.stringify(this.list));
    }

    create=(product)=>{

        this.list.push(product);

        this.reload();
    }

    toCard=(product,categorie)=>{
        categorie.innerHTML +=
        `
        <section class="main-card-categorie card-${product.category}">
            <img src="${product.image}" alt="">
            <i class="far fa-heart"></i>
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <h3 class="pret-produs">${product.price} Lei</h3>
        </section>
        `;
    }

    toCategory=(product)=>{
        this.categorii.forEach((e)=>{
            if(e.classList.contains(`main-categorie-${product.category}`)){
                this.toCard(product,e);
            }
        })
    }

    delete=(id)=>{
        this.list = this.list.filter(e=>e.id!==id);

        this.reload();
    }

    getItemById=(id)=>{
        for(let i of this.list){
            if(i.id ==id){
                return i;
            }
        }
    }

    updateName=(id,newName)=>{
    
        let obj = this.getItemById(id);

        obj.name = newName;

        this.reload();
    }

    updatePrice=(id,newPrice)=>{
    
        let obj = this.getItemById(id);

        obj.price = newPrice;

        this.reload();
    }

    updateDescription=(id,newDescription)=>{
    
        let obj = this.getItemById(id);

        obj.description = newDescription;

        this.reload();
    }
    
    updateImage=(id,newImage)=>{
    
        let obj = this.getItemById(id);

        obj.image = newImage;

        this.reload();
    }

    updateCategory=(id,newCategory)=>{
    
        let obj = this.getItemById(id);

        obj.category = newCategory;

        this.reload();
    }

    updateCreateDate=(id,newCreateDate)=>{
    
        let obj = this.getItemById(id);

        obj.create_date = newCreateDate;

        this.reload();
    }

    updateStock=(id ,newStock)=>{
    
        let obj = this.getItemById(id);

        obj.stock = newStock;

        this.reload();

    }

    updateFavoriteStatus=(id ,status)=>{
    
        let obj = this.getItemById(id);

        obj.favariteStatus = status;

        this.reload();

    }

    updateCartStatus=(id ,status)=>{
    
        let obj = this.getItemById(id);

        obj.cartStatus = status;

        this.reload();

    }
    
    setFavoriteProduct=(name,status)=>{
        this.list.forEach(e=>{
            if(name == e.name){
                e.favariteStatus = status;
            }
        });

        this.reload();
    }

    getFavoriteStatus=(productName)=>{
        for(let obj of this.list){
            if(productName == obj.name){
                return obj.favariteStatus;
            }
        }
    }

    getProductByName=(name)=>{
        for(let obj of this.list){
            if(name == obj.name){
                return obj;
            }
        }

    }

    setProductCartStatus=(name,status)=>{
        this.list.forEach(e=>{
            if(name == e.name){
                e.cartStatus = status;
            }
        });

        this.reload();
    }

    getProductCartSatus=(productName)=>{
        for(let obj of this.list){
            if(productName == obj.name){
                return obj.cartStatus;
            }
        }
    }

    

   
}