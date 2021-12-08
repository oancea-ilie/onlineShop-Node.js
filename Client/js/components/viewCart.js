import viewHome from "./viewHome.js"
import viewUserInterface from "./viewUserInterface.js";
import viewFavorite from "./viewFavorite.js";
import Data from "../data.js";
import viewUserAccount from "./viewUserAccount.js";


export default class viewCart{
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
        this.userBtn.addEventListener('click',this.handleUserBtn);
        
        this.logOutBtn = document.querySelector('.logout-btn');

        this.logOutBtn.addEventListener('click',this.handleLogOut);
        this.toggleBtn.addEventListener("click",this.handleToggleBtn);
        this.brand.addEventListener('click',this.handleBrand);
        this.cardBtn = document.querySelector('.cart-btn');

        this.favoriteBtn = document.querySelector('.favorite-btn');
        this.favoriteBtn.addEventListener('click',this.handleBigFavorite);

        //main
        this.data = new Data();
        this.setToggleCategories();
        this.navbar = document.querySelector('.navbar');
        this.setNavbar();
        this.cosGolText = document.querySelector('.cos-gol-text');
        this.cosGolImg = document.querySelector('.cos-gol-img');

        this.container = document.querySelector('.cart-container'); 
        this.container.addEventListener('click',this.handleCartContainerClick);
        this.container.addEventListener('change',this.handleCartContainerChange);


        this.getAllProducts();
        this.trimiteComanda;

        // local storage
        this.cartArr = this.loadLocalCart();
        this.orderArr = this.loadLocalOrder();
        this.localAmmountStart();
    }

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
        
        this.orderArr = this.orderArr.filter(e => e != obj);
        localStorage.setItem('produseAdaugate', JSON.stringify(this.orderArr));
        
    }

    resetLocalOrder=()=>{
        this.orderArr = [0];
        localStorage.setItem('produseAdaugate',JSON.stringify(this.orderArr));
    }

    localAmmountStart=()=>{
        for(let e of this.orderArr){
            if(e != 0){
                let obj = e;
                obj.ammount = 1;
                this.removeLocalOrder(e);
                this.InsertLocalOrder(obj);
            }
        }

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
                    <a href="#" class="cart-btn"><i class="fas fa-shopping-cart" style="color: #c09f80;"></i></a>
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
        this.body.innerHTML +=
        `
        <main>

        <section class="toggle-section">

        </section>

            <section class="cart-container">
                <img src="svg/sad.svg" class="cos-gol-img">
                <p class="cos-gol-text">Ups, cardul este gol!</p>

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

    getAllProducts= async()=>{
        let allProducts = await this.data.getProducts();

        if(this.cartArr.length > 1){
            this.cosGolImg.style.display = 'none';
            this.cosGolText.style.display = 'none';
             
            for(let i = 0; i < allProducts.length; i++){
               for(let j = 0; j<this.cartArr.length; j++){
                    if(allProducts[i].id == this.cartArr[j]){
                        this.setProduct(allProducts[i]);
                    }
               }
            }

            this.setCartSumar();
            this.trimiteComanda = document.querySelector('.trimite-comanda');
            this.trimiteComanda.addEventListener('click',this.handleTrimteComanda);
            this.handleOrderPrice();
        }else{
            this.cosGolImg.style.display = 'block';
            this.cosGolText.style.display = 'block';
        }
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

    handleOrderPrice=async()=>{
        let costProduse = 0;
        let cost = document.querySelector('.cost-total-produse');
        let costTotal = document.querySelector('.total-cost-produse');

        for(let obj of this.orderArr){
            if(obj !=0 ){
                let product = await this.data.getProductById(obj.product_id);
                costProduse += product.price * obj.ammount;
            }
        }

        cost.textContent = `${costProduse} Lei`;
        costTotal.textContent = `${costProduse + 15} Lei`;
    }

    handleTrimteComanda= async ()=>{
        let json = JSON.parse(localStorage.getItem('produseAdaugate'));
        let arr=[];
        for(let i of json){
            arr.push(i);
        }

        let newOrder ={
             id: await this.data.OrderNextId(),
             customer_id: this.clientId,
             ammount: 0,
             order_address: `Client ID: ${this.clientId} Adress`,
             order_date: this.dateCoverter()
        }


        for(let obj of arr){
            let productID = obj.product_id;

            if(typeof productID == "number"){
                let product = await this.data.getProductById(productID);
                let orderDetailsId = await this.data.OrderDetailsNextId();

                let orderDetails={
                    id: orderDetailsId,
                    order_id : newOrder.id,
                    product_id : productID,
                    price : product.price,
                    quantity: obj.ammount
                }

                newOrder.ammount += orderDetails.price * orderDetails.quantity;
                this.data.addOrderDetails(orderDetails);

            }


        }

        this.data.addOrder(newOrder);

        let p = document.createElement('p');
        p.textContent = 'Comanda a fost inregistrata!';
        p.style.color = 'green';
        p.style.textAlign = 'center';
        p.style.fontSize = '1.2rem ';
        p.style.paddingTop = '1rem';
        this.container.appendChild(p);

        setTimeout( ()=>{
            this.container.innerHTML = '';
            this.resetLocalCart();
            this.resetLocalOrder();
            let nou = new viewUserInterface(this.clientId);
        },3000);


    }

    handleCartContainerClick= async(e)=>{
        let obj = e.target;
        
        if(obj.classList.contains("fa-times")){
            let id = obj.parentNode.getAttribute('id').slice(2);
            id = parseInt(id);

            this.container.removeChild(obj.parentNode);
            this.removeLocalCart(id);
            
            for(let e of this.orderArr){
                if(e.product_id == id){
                    this.removeLocalOrder(e);
                }
            }
            
            this.handleOrderPrice();

        }
        
        if(this.cartArr.length == 1){
            let cartSumar = document.querySelector('.cart-sumar');
            let img = document.querySelector('.cos-gol-img');
            let p = document.querySelector('.cos-gol-text');
            this.container.removeChild(cartSumar);
            img.style.display = 'block';
            p.style.display = 'block';
        }

    }

    handleCartContainerChange=async(e)=>{
        let obj = e.target;

        if(obj.classList.contains("cantitate-produs-cart")){
            let pret = obj.parentNode.children[4];
            let id = obj.parentNode.getAttribute('id').slice(2);
            id = parseInt(id);

            let ammount = parseInt(obj.value);

            for(let e of this.orderArr){
                if(e.product_id == id){
                    let ob = e;
                    ob.ammount = ammount;
                    this.removeLocalOrder(e);
                    this.InsertLocalOrder(ob);

                    let product = await this.data.getProductById(e.product_id);
                    pret.textContent = `Pret: ${product.price * e.ammount} Lei`;
                }

            }

        }

        this.handleOrderPrice();
    }

    setProduct=(obj)=>{
        this.container.innerHTML +=
        `
        <section class="cart-product card-pc" id="id${obj.id}">
            <i class="fas fa-times close-produs-cart"></i>
            <img src="${obj.image}" alt="">
            <p class="descriere-produs-cart">${obj.name}</p>
            <select class="cantitate-produs-cart">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
            <h3 class="pret-produs-cart">Pret: ${obj.price} Lei</h3>
        </section>
        `

    }
    
    setCartSumar=()=>{  
        this.container.innerHTML +=
        `
        <section class="cart-sumar">
            <p>Cost produse: <span class="cost-total-produse">230120 Lei</span> lei</p>
            <p>Cost livrare: <span class="cost-livrare-produse">15</span> lei</p>
            <p class="total-cost-produse">Total: 4015 lei</p>
            <a href="#" class="trimite-comanda">Trimite comanda <i class="fas fa-angle-double-right"></i></a>
        </section>
        `
    }

    handleUserBtn=()=>{
        let nou = new viewUserAccount(this.clientId);
    }

    handleBrand=()=>{
        let nou = new viewUserInterface(this.clientId);
    }
    
    handleBigFavorite=()=>{
        let nou = new viewFavorite(this.clientId);
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