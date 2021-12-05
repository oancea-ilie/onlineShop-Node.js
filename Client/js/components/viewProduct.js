import viewUserInterface from "./viewUserInterface.js";
import viewHome from "./viewHome.js";
import viewFavorite from "./viewFavorite.js";
import viewCart from "./viewCart.js";
import Data from "../data.js";

export default class viewProduct{
    constructor(product,productId,clientId){
        this.clientId = clientId;
        this.product = product;
        this.productId = productId;

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
        this.data = new Data();
        this.setToggleCategories();

        this.productContainer = document.querySelector('.product-container');
        this.productDescription();

        this.addCart = document.querySelector('.add-cart');
        this.addCart.addEventListener('click', this.handleAddCart);


        // local storage
        this.cartArr = this.loadLocalCart();
        this.orderArr = this.loadLocalOrder();

    }

    //local cart
    loadLocalCart=()=>{
        let json = JSON.parse(localStorage.getItem('cart'));
        let arr=[];
        
        for(let i of json){
            arr.push(i);
        }

        return arr;
    }

    InsertLocalCart=(value)=>{
        this.cartArr.push(value);

        localStorage.setItem('cart', JSON.stringify(this.cartArr));

    }
    
    removeLocalCart=(value)=>{
        if(value !=0 || value !=null ){
            this.cartArr = this.cartArr.filter(e => e != value);
            localStorage.setItem('cart', JSON.stringify(this.cartArr));
        }
    }

    resetLocalCart=()=>{
        this.cartArr = [0];
        localStorage.setItem('cart',JSON.stringify(this.cartArr));
    }

    //local order
    loadLocalOrder=()=>{
        let json = JSON.parse(localStorage.getItem('produseAdaugate'));
        let arr=[];
        
        for(let i of json){
            arr.push(i);
        }

        return arr;
    }

    InsertLocalOrder=(obj)=>{
        this.orderArr.push(obj);

        localStorage.setItem('produseAdaugate', JSON.stringify(this.orderArr));
    }

    removeLocalOrder=(obj)=>{
        if(value !=0 || value !=null ){
            this.orderArr = this.orderArr.filter(e => e != obj);
            localStorage.setItem('produseAdaugate', JSON.stringify(this.orderArr));
        }
    }

    resetLocalOrder=()=>{
        this.orderArr = [0];
        localStorage.setItem('produseAdaugate',JSON.stringify(this.orderArr));
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
         
            </section>
        </section>

            <section class="product-container" id="id${this.productId}">

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

    dateCoverter=()=>{
        let date = new Date();

        let year = date.getFullYear();
        let month  = date.getMonth();
        let day = date.getDate();
        let hour = date.getHours();
        let minutes = date.getMinutes();

        return `${hour}:${minutes} ${day}/${month}/${year}`;
    }

    handleAddCart= async (e)=>{
        e.preventDefault();

        let id = this.productContainer.getAttribute('id').slice(2);
        let currProduct = await this.data.getProductById(id);
        let productRight = document.querySelector('.product-right');

        let ok = 0;
        for(let obj of this.cartArr){
            if(obj == currProduct.id){
                ok = 1;
            }
        }

        if(ok == 0){
            let order = {
                product_id: currProduct.id,
                customer_id: this.clientId,
                ammount: 1
            }
            
            this.InsertLocalOrder(order);
            this.InsertLocalCart(currProduct.id);

            productRight.innerHTML +=
            `<p class="add-notificare">Produsul ${currProduct.name} a fost adaugat in cos!</p>`;
        }else{
            productRight.innerHTML +=
            `<p class="add-notificare" >Produsul ${currProduct.name} este deja in cos!</p>`;
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
        let nou = new viewFavorite(this.clientId);
    }

    handleCartBtn=()=>{
        let nou = new viewCart(this.clientId);
    }

    handleBrand=()=>{
        let nou = new viewUserInterface(this.clientId);
    }

    handleLogOut=()=>{
        let nou = new viewHome();
    }

}