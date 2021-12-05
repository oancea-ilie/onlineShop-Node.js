import viewHome from "./viewHome.js"
import viewFavorite from "./viewFavorite.js"
import viewProduct from "./viewProduct.js";
import viewCart from "./viewCart.js";
import Data from "../data.js";

export default class viewUserInterface{
    constructor(clientId){
        this.clientId = clientId;
        this.body = document.querySelector('body');
        this.header();
        this.main();
        this.toggleBtn = document.querySelector('.toggle-btn');
        this.bars = document.querySelector('.fa-bars');
        this.toggleSection = document.querySelector(".toggle-section");
        this.onOf = 0;
        this.brand = document.querySelector('.brand');
        this.searchBtn = document.querySelector('.search-btn');
        this.searchInput = document.querySelector('.search-input');
        this.categorii = document.querySelector('.main-container-categorii');

        this.userBtn = document.querySelector('.user-btn');
        this.logOutBtn = document.querySelector('.logout-btn');
        this.logOutBtn.addEventListener('click',this.handleLogOut);

        this.toggleBtn.addEventListener("click",this.handleToggleBtn);
        
        this.favoriteBtn = document.querySelector('.favorite-btn');
        this.favoriteBtn.addEventListener('click',this.handleBigFavorite);

        this.cardBtn = document.querySelector('.cart-btn');
        this.cardBtn.addEventListener('click',this.handleCardBtn);

        this.data = new Data();
        this.productFunctionality();

        // local storage
        this.favoriteArr = this.loadLocalFavorite();

        // this.localCart = localStorage.getItem('cart');
        // this.cartArr = this.loadLS(this.localCart);

    }

    loadLocalFavorite=()=>{
        let json = JSON.parse(localStorage.getItem('favorite'));
        let arr=[];
        
        for(let i of json){
            arr.push(i);
        }

        return arr;
    }

    InsertLocalFavorite=(value)=>{
        this.favoriteArr.push(value);

        localStorage.setItem('favorite', JSON.stringify(this.favoriteArr));

    }
    
    removeLocalFavorite=(value)=>{
        if(value !=0 || value !=null ){
            this.favoriteArr = this.favoriteArr.filter(e => e != value);
            localStorage.setItem('favorite', JSON.stringify(this.favoriteArr));
        }
    }

    resetLocalFavorite=()=>{
        this.favoriteArr = [];
        localStorage.setItem('favorite',JSON.stringify(this.favoriteArr));
    }

    header=()=>{
        this.body.innerHTML = '';

        this.body.innerHTML += 
        `
        <header> 
            <section class="first-header">
                <section class="first-header-left">
                    <a href="#" class="toggle-btn"><i class="fas fa-bars"></i></i></a>
                    <a href="#" class="brand">ONLINE SHOP</a>
                </section>
                <section class="first-header-right">
                    <a href="#" class="favorite-btn"><i class="far fa-heart"></i></a>
                    <span class="notificare"></span>
                    <a href="#" class="cart-btn"><i class="fas fa-shopping-cart"></i></a>
                    <a href="#" class="register-btn" style="display: none;"><i class="fas fa-user-plus"></i></a>
                    <a href="#" class="user-btn"><i class="fas fa-user-tie"></i></a>
                    <a href="#" class="logout-btn"><i class="fas fa-sign-out-alt"></i></a>
                </section>
            </section>
            <section class="last-header">
                <input type="text" class="search-input">
                <a href="#" class="search-btn"><i class="fas fa-search"></i></a>
            </section>
        </header>
        `
    }

    main=()=>{
        this.body.innerHTML+= 
        `
        <main>
        <section class="toggle-section">
            <section class="toggle-section-flex categorie-telefon">
                <img src="svg/phone.svg" alt="">
                <p>Telefoane Mobile</p>
            </section>

            <section class="toggle-section-flex categorie-pc" >
                <img src="svg/pc.svg" alt="">
                <p>Desktop Pc</p>
            </section>

            <section class="toggle-section-flex categorie-leptop">
                <img src="svg/laptop.svg" alt="">
                <p>Leptop / Notebook</p>
            </section>

            <section class="toggle-section-flex categorie-tv">
                <img src="svg/tv.svg" alt="">
                <p>Televizoare</p>
            </section>
            <section class="toggle-section-flex categorie-audio" >
                <img src="svg/audio.svg" alt="">
                <p>Sisteme Audio</p>
            </section>
        </section>
            <section class="main-img-container">
                <h2>Ai primit un voucher in valoare de: <span>20 de lei!</span></h2>
            </section>
            <section class="main-container-categorii">
            
            </section>
        </main>
        `
    }

    productFunctionality= async()=>{
        try{
            await this.setCategories();
            await this.setProductsToCategories();
            await this.setToggleCategories();

            this.categorii.addEventListener('click', this.handleAllProducts);


        }catch(e){
            console.log(e);
        }
    }

    setCategories = async()=>{
        this.categorii.innerHTML = '';
        let categories = await this.data.getCategories();

        if(categories){
            for(let c of categories){
                this.categorii.innerHTML +=
                `
                    <h2>${c.description}</h2>
                    <section class="main-categorie main-categorie-${c.name}">
            
                    </section>

                `
            }
        }
    }

    setToggleCategories= async()=>{
        let categoris = await this.data.getCategories();
        
        this.toggleSection.innerHTML = '';

            for(let cat of categoris){
                this.toggleSection.innerHTML +=
                `
                <section class="toggle-section-flex categorie-${cat.name}">
                    <img src="${cat.image}" alt="">
                    <p>${cat.description}</p>
                </section>
                `;
            }
    }

    setProductsToCategories= async(id)=>{

        try{

            let producs = await this.data.getProducts(); //toate produsele

            let categoris = await this.data.getCategories(); //toate categoriile

            for(let category of categoris){

                // retine toate productsCategory ce au propietatea category_id == id
                let  prod_cat = await this.data.getProductsCategoryByCategory(category.id); 
                
                let cat;
                if(prod_cat){
                    cat = document.querySelector(`.main-categorie-${category.name}`);

                    for(let pc of prod_cat){

                        let filtrate = producs.filter(e=>e.id == pc.product_id);

                        filtrate.forEach(e=>{
                                this.toProduct(e,cat);
                        });
                        
                    }
                }

            }


        }catch(e){

            console.log(e);
        }

    }

    toProduct=(product,categorie)=>{
        let ok = 0;


        for(let e of this.favoriteArr){
            if(e == product.id){
                ok = 1;
            }
        }


        if(ok == 0){
            categorie.innerHTML +=
            `
            <section class="main-card-categorie" id="id${product.id}">
                <img src="${product.image}" class="product-image">
                <i class="far fa-heart"></i>
                <h2  class="product-name">${product.name}</h2>
                <p  class="product-description">${product.description}</p>
                <h3 class="pret-produs">${product.price} Lei</h3>
            </section>
            `;
        }else{
            categorie.innerHTML +=
            `
            <section class="main-card-categorie" id="id${product.id}">
                <img src="${product.image}" class="product-image">
                <i class="fas fa-heart"></i>
                <h2  class="product-name">${product.name}</h2>
                <p  class="product-description">${product.description}</p>
                <h3 class="pret-produs">${product.price} Lei</h3>
            </section>
            `;
        }
        
    }

    handleToggleBtn=()=>{
        if(this.onOf ==0){
            this.toggleSection.style.transform = 'translateX(0%)';
            this.onOf = 1;
            this.bars.classList.remove('fa-bars');
            this.bars.classList.add('fa-times');
        }else{
            this.toggleSection.style.transform = 'translateX(-100%)';
            this.onOf = 0;
            this.bars.classList.remove('fa-times');
            this.bars.classList.add('fa-bars');
        }
        
    }

    handleBigFavorite=()=>{

        let nou = new viewFavorite(this.clientId);
    }

    handleAllProducts= async(e)=>{
        let obj = e.target;

        // favorite icon
        if(obj.classList.contains("fa-heart")){
            let id = obj.parentNode.getAttribute('id').slice(2);
            id = parseInt(id);
            let currProduct = await this.data.getProductById(id);

            if(obj.classList.contains('far')){
                obj.classList.remove('far');
                obj.classList.add('fas');
                this.InsertLocalFavorite(id);
            }
            else{
                obj.classList.remove('fas');
                obj.classList.add('far');
                this.removeLocalFavorite(id);
            }
        }

        // container
        if(obj.classList.contains("main-card-categorie")){
            let id = obj.getAttribute('id').slice(2);
            let currProduct = await this.data.getProductById(id);
            let nou = new viewProduct(currProduct,currProduct.id,this.clientId);            
        }

        // altceva
        if(obj.classList.contains("product-image") 
            || obj.classList.contains("product-name")
            || obj.classList.contains("product-description")
            || obj.classList.contains("pret-produs")
            ){

            let id = obj.parentNode.getAttribute('id').slice(2);
            let currProduct = await this.data.getProductById(id);
            let nou = new viewProduct(currProduct,currProduct.id,this.clientId);  
        }

    }

    handleCardBtn=()=>{
        let nou = new viewCart(this.clientId);
    }

    handleLogOut=()=>{
        let nou = new viewHome();
    }

}