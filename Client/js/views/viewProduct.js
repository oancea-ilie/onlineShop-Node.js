import ProductsController from "../controller/productsController.js";
import viewUserInterface from "./viewUserInterface.js";
import viewHome from "./viewHome.js";
import viewFavorite from "./viewFavorite.js";
import viewCart from "./viewCart.js";

export default class viewProduct{
    constructor(product, username){
        this.username = username;
        this.product = product;
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

        this.favoriteBtn = document.querySelector('.favorite-btn');
        this.favoriteBtn.addEventListener('click',this.handleFavoriteBtn);

        this.logOutBtn.addEventListener('click',this.handleLogOut);
        this.toggleBtn.addEventListener("click",this.handleToggleBtn);
        this.brand.addEventListener('click',this.handleBrand);
        this.cardBtn = document.querySelector('.cart-btn');
        this.cardBtn.addEventListener('click',this.handleCartBtn);

        
        //main
        this.productController = new ProductsController();
        this.productContainer = document.querySelector('.product-container');
        this.productDescription();

        this.addCart = document.querySelector('.add-cart');
        this.addCart.addEventListener('click',this.handleAddCart);

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
        this.body.innerHTML +=
        `
        <main style="background-color: white;">
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

            <section class="product-container">

            </section>
        </main>
        `
    }
    
    productDescription=()=>{
        this.productContainer.innerHTML +=
        `
            <h3>${this.product.name}</h3>
                    
            <section class="product-left">
                <img src="${this.product.image}" alt="">
                <img src="/svg/garantie.svg" alt="" class="garantie">
                <p>Garantie 2 Ani</p>
                <img src="/svg/product.svg" alt="">
                <p>14 zile retur gratuit</p>

                <p class="descriere">${this.product.description}</p>
            </section>
            <section class="product-right card-pc">
                <h3 class="pret-produs-cart">${this.product.price} Lei</h3>
                <a href="#" class="add-cart"><i class="fas fa-shopping-cart"></i> Adauga in Cos</a>
            </section>
    
        `
    }

    handleAddCart=(e)=>{
        e.preventDefault();
        let product = this.productContainer.children[0].textContent;
        let status = this.productController.getProductCartSatus(product);
        let productRight = document.querySelector('.product-right');

        if(status ==0){
            this.productController.setProductCartStatus(product,1);

            productRight.innerHTML +=
            `
                <p class="add-notificare">Produsul ${this.product.name} a fost adaugat in cos!</p>
            `
        }else{
            productRight.innerHTML +=
            `
                <p class="add-notificare" >Produsul ${this.product.name} este deja in cos!</p>
            `
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

    handleFavoriteBtn=()=>{
        let nou = new viewFavorite(this.username);
    }

    handleCartBtn=()=>{
        let nou = new viewCart(this.username);
    }

    handleBrand=()=>{
        let nou = new viewUserInterface(this.username);
    }

    handleLogOut=()=>{
        let nou = new viewHome();
    }


}