import Categories from "../model/categories.js";
export default class CategoriesController{
    constructor(){
        this.list=[];
        this.arr =JSON.parse(localStorage.getItem("categories"));
        this.toObject();

        this.categorii = document.querySelector('.main-container-categorii');
        this.toggleSection = document.querySelector('.toggle-section');

    }

    toObject=()=>{
        this.arr.forEach(e => {
            this.list.push(new Categories(e.id,e.name,e.description,e.image));
        });
    }

    restore=()=>{
        let obj = new Categories(1,'restore','restore','restore');
        this.list = [];
        this.create(obj);
    }

    reload=()=>{
        localStorage.setItem('categories',JSON.stringify(this.list));
    }

    toCard=(category)=>{
        this.categorii.innerHTML +=
        `
        <h2>${category.description}</h2>
        <section class="main-categorie main-categorie-${category.name}">

        </section>
        `
    }

    toToggleCategories=(category)=>{
        this.toggleSection.innerHTML +=
        `
        <section class="toggle-section-flex categorie-${category.name}">
            <img src="${category.image}" alt="">
            <p>${category.description}</p>
        </section>
        `;
        
    }

    create=(categories)=>{
        this.list.push(categories);

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

    updateName=(id,newName)=>{
    
        let obj = this.getItemById(id);

        obj.name = newName;

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

    

}