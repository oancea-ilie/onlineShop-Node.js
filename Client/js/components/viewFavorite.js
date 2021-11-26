import viewHome from "./viewHome.js"
import viewUserInterface from "./viewUserInterface.js";
import viewProduct from "./viewProduct.js";
import viewCart from "./viewCart.js";
import Data from "../data.js";

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

        this.data = new Data();
        this.setToggleCategories();

        this.container = document.querySelector('.favorite-container'); 
        
        this.favoriteImgGol = document.querySelector('.favorite-gol-img');
        this.favoriteTextGol = document.querySelector('.favorite-gol-text');

        this.asyncHandler();
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

            </section>
        </section>

            <section class="favorite-container">
                <img src="img/favorite.png" class="favorite-gol-img" alt="">
                <p class="favorite-gol-text">Ups, nu sunt produse favorite!</p>

            </section>
        </main>
        `
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

    asyncHandler= async()=>{
        try{
            await this.setProducts();

            let favoriteBtns = document.querySelectorAll('.favorite-product i');
            
            for(let e of favoriteBtns){
                let i = 0;

                e.addEventListener('click',async()=>{
                    let parent = e.parentNode;
                    let id = parent.getAttribute('id').slice(2);
                    let currProduct = await this.data.getProductById(id);
                    
                    currProduct.cartStatus = false;

                    this.container.removeChild(parent);

                    this.data.updateProduct(currProduct.id, currProduct);

                    let allProducts = await this.data.getProducts();
                    
                    let filtrat = allProducts.filter(e=>e.favariteStatus == true);

                });

                // if(i==1){
                //     this.favoriteImgGol.style.display= 'block';
                //     this.favoriteTextGol.style.display = 'block';
                // }

            }

            
            // this.allProducts = document.querySelectorAll('.favorite-product');
            // this.handleAllProducts();

        }catch(e){
            console.log(e);
        }
    }

    setProducts= async()=>{

        let allProducts = await this.data.getProducts();

        let filtrat = allProducts.filter(e => e.favariteStatus == true);

        filtrat.forEach(e => this.toCard(e));


        if(filtrat.length > 0){
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
        <section class="favorite-product card-${product.category}" id="id${product.id}">
            <img src="${product.image}" alt="">
            <i class="fas fa-heart"></i>
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <h3 class="pret-produs">${product.price} Lei</h3>
        </section>
        `;
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