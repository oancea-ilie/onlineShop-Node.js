import viewHome from "./viewHome.js"
import viewUserInterface from "./viewUserInterface.js";
import viewProduct from "./viewProduct.js";
import viewCart from "./viewCart.js";
import Data from "../data.js";

export default class viewFavorite{
    constructor(clientId){
        this.clientId = clientId;
        this.body = document.querySelector('body');

        this.header();
        this.main();

        //header
        this.toggleBtn = document.querySelector('.toggle-btn');
        this.bars = document.querySelector('.fa-bars');
        this.toggleSection = document.querySelector(".toggle-section");
        this.onOf = 0;
        this.brand = document.querySelector('.brand');
        
        this.searchBtn = document.querySelector('.search-btn');
        this.searchInput = document.querySelector('.search-input');
        this.userBtn = document.querySelector('.user-btn');
        this.logOutBtn = document.querySelector('.logout-btn');

        this.logOutBtn.addEventListener('click',this.handleLogOut);
        this.toggleBtn.addEventListener("click",this.handleToggleBtn);
        this.brand.addEventListener('click',this.handleBrand);
        this.cardBtn = document.querySelector('.cart-btn');
        this.cardBtn.addEventListener('click',this.handleCardBtn);

        //main
        this.favoriteLocalStorage = localStorage.getItem('favorite');
        this.data = new Data();
        this.setToggleCategories();
        this.navbar = document.querySelector('.navbar');
        this.setNavbar();
        
        this.container = document.querySelector('.favorite-container'); 
        this.container.addEventListener('click',this.handleAllProducts);

        this.favoriteImgGol = document.querySelector('.favorite-gol-img');
        this.favoriteTextGol = document.querySelector('.favorite-gol-text');


        // local storage
        this.favoriteArr = this.loadLocalFavorite();
        this.setProducts();

    }

    //local storage
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
        this.favoriteArr = [0];
        localStorage.setItem('favorite',JSON.stringify(this.favoriteArr));
    }

    // local storage

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
                    <a href="#" class="favorite-btn"><i class="fas fa-heart" style="color:#c09f80;"></i></a>
                    <span class="notificare"></span>
                    <a href="#" class="cart-btn"><i class="fas fa-shopping-cart"></i></a>
                    <a href="#" class="register-btn" style="display: none;"><i class="fas fa-user-plus"></i></a>
                    <a href="#" class="user-btn"><i class="fas fa-user-tie"></i></a>
                    <a href="#" class="logout-btn"><i class="fas fa-sign-out-alt"></i></a>
                </section>
            </section>
            <section class="last-header navbar">
            </section>
        </header>
        `
    }

    main=()=>{
        this.body.innerHTML+= 
        `
        <main>
            <section class="toggle-section">

            </section>
        </section>

            <section class="favorite-container">
                <section class="favorite-gol">
                    <img src="img/favorite.png" class="favorite-gol-img" alt="">
                    <p class="favorite-gol-text">Ups, nu sunt produse favorite!</p>
                </section>
            </section>
        </main>
        `
    }
    
    setNavbar= async()=>{
        let categoris = await this.data.getCategories();
        
        this.navbar.innerHTML = '';

            for(let cat of categoris){
                this.navbar.innerHTML +=
                `
                <section class="nav-bar-section">
                    <img src="${cat.image}">
                    <p>${cat.description}</p>
                </section>
                `;
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

    handleAllProducts= async(e)=>{
        let obj = e.target;

        // favorite icon
        if(obj.classList.contains("fa-heart")){
            let id = obj.parentNode.getAttribute('id').slice(2);
            id = parseInt(id);

            this.container.removeChild(obj.parentNode);
            this.removeLocalFavorite(id);
            
        }

        // container
        if(obj.classList.contains("favorite-product")){
            let id = obj.getAttribute('id').slice(2);
            let currProduct = await this.data.getProductById(id);
            let nou = new viewProduct(currProduct,currProduct.id);            
        }

        // altceva
        if(obj.classList.contains("product-image") 
            || obj.classList.contains("product-name")
            || obj.classList.contains("product-description")
            || obj.classList.contains("pret-produs")
            ){

            let id = obj.parentNode.getAttribute('id').slice(2);
            let currProduct = await this.data.getProductById(id);
            let nou = new viewProduct(currProduct,currProduct.id);  
        }
        
        if(this.favoriteArr.length == 1){
            let img = document.querySelector('.favorite-gol-img');
            let p = document.querySelector('.favorite-gol-text');

            // nu inteleg de isi pierde referinta this.golImage !!!
            let container1 = document.querySelector('.favorite-container');
            container1.style.gridTemplateColumns = '1fr';
            let gol = document.querySelector('.favorite-gol');
            gol.style.display = 'flex';
        }

    }

    setProducts= async()=>{

        let allProducts = await this.data.getProducts();

        if(this.favoriteArr.length > 1){
            let gol = document.querySelector('.favorite-gol');
            gol.style.display = 'none';
            
            for(let i = 0; i<allProducts.length; i++){
               for(let j = 0; j<this.favoriteArr.length; j++){
                    if( allProducts[i].id == this.favoriteArr[j]){
                        this.toCard(allProducts[i]);
                    }
               }
            }


        }else{
            let container1 = document.querySelector('.favorite-container');
            container1.style.gridTemplateColumns = '1fr';
            let gol = document.querySelector('.favorite-gol');
            gol.style.display = 'flex';
        }

    }

    toCard=(product)=>{
        this.container.innerHTML +=
        `
        <section class="favorite-product" id="id${product.id}">
            <img src="${product.image}" class="product-image">
            <i class="fas fa-heart"></i>
            <h2 class="product-name">${product.name}</h2>
            <p class="product-description">${product.description}</p>
            <h3 class="pret-produs">${product.price} Lei</h3>
        </section>
        `;
    }

    handleBrand=()=>{
        let nou = new viewUserInterface(this.clientId);
    }

    handleCardBtn=()=>{
        let nou = new viewCart(this.clientId);
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

    handleLogOut=()=>{
        let nou = new viewHome();
    }

}