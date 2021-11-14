import viewHome from "./viewHome.js"
import ProductsController from "../controller/productsController.js";
import viewUserInterface from "./viewUserInterface.js";
import viewProduct from "./viewProduct.js";
import viewCart from "./viewCart.js";

export default class viewFavorite{
    constructor(username){
        this.username = username;
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

        this.container = document.querySelector('.favorite-container'); 
        this.productController = new ProductsController();
        
        this.favoriteImgGol = document.querySelector('.favorite-gol-img');
        this.favoriteTextGol = document.querySelector('.favorite-gol-text');

        this.setProducts();
        this.favoriteBtns = document.querySelectorAll(".favorite-product i");
        this.handleFavoriteBtn();

        this.allProducts = document.querySelectorAll('.favorite-product');
        this.handleAllProducts();
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
                    <a href="#" class="favorite-btn"><i class="fas fa-heart" style="color:#c09f80;"></i></a>
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


            <section class="favorite-container">
                <img src="img/favorite.png" class="favorite-gol-img" alt="">
                <p class="favorite-gol-text">Ups, nu sunt produse favorite!</p>

            </section>
        </main>
        `
    }

    setProducts=()=>{

        let i = 0;

        this.productController.list.forEach(e=>{
            if(e.favariteStatus == 1){
                this.toCard(e);
                i = 1;
            }
        });

        if(i ==1){
            this.favoriteImgGol.style.display = 'none';
            this.favoriteTextGol.style.display = 'none';

        }else{
            this.favoriteImgGol.style.display = 'block';
            this.favoriteTextGol.style.display = 'block';
        }

    }

    toCard=(product)=>{
        this.container.innerHTML +=
        `
        <section class="favorite-product card-${product.category}">
            <img src="${product.image}" alt="">
            <i class="fas fa-heart"></i>
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <h3 class="pret-produs">${product.price} Lei</h3>
        </section>
        `;
    }

    handleFavoriteBtn=()=>{
        this.favoriteBtns.forEach(e=>{

            e.addEventListener('click',()=>{
                let productName = e.parentNode.children[2].textContent;
                let parent = e.parentNode;
                this.container.removeChild(parent);
                this.productController.setFavoriteProduct(productName,0);

                    if(this.container.children.length == 2){
                        console.log('test');
                        // NUU MERGE NU INTELEG DE CE!
                        this.favoriteImgGol.style.display= 'block';
                        this.favoriteTextGol.style.display = 'block';
                    }
            });
        })
    }

    handleBrand=()=>{
        let nou = new viewUserInterface(this.username);
    }

    handleAllProducts=()=>{
        this.allProducts.forEach(e=>{
            e.addEventListener('click',(el)=>{
                let fav = e.children[1];
                if(el.target!= fav){
                    let productName = e.children[2].textContent;
                    let product = this.productController.getProductByName(productName);

                    let nou = new viewProduct(product,this.username);
                }
            })

        });
    }

    handleCardBtn=()=>{
        let nou = new viewCart(this.username);
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