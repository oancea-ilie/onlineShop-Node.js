import viewHome from "./viewHome.js"
import viewUserInterface from "./viewUserInterface.js";
import viewFavorite from "./viewFavorite.js";
import Data from "../data.js";
import viewCart from "./viewCart.js";

export default class viewUserAccount{
    constructor(clientId){
        this.data = new Data();
        this.clientId = clientId;
        this.body = document.querySelector('body');
        this.header();
        this.main();
        this.toggleBtn = document.querySelector('.toggle-btn');
        this.bars = document.querySelector('.fa-bars');
        this.toggleSection = document.querySelector(".toggle-section");
        this.onOf = 0;

        this.brand = document.querySelector('.brand');
        this.brand.addEventListener('click',this.handleBrand);

        this.navbar = document.querySelector('.navbar');

        this.userBtn = document.querySelector('.user-btn');
        this.userBtn.style.color = '#c09f80';

        this.logOutBtn = document.querySelector('.logout-btn');
        this.logOutBtn.addEventListener('click',this.handleLogOut);

        this.toggleBtn.addEventListener("click",this.handleToggleBtn);
        
        this.favoriteBtn = document.querySelector('.favorite-btn');
        this.favoriteBtn.addEventListener('click',this.handleBigFavorite);

        this.cardBtn = document.querySelector('.cart-btn');
        this.cardBtn.addEventListener('click',this.handleCardBtn);

        this.userDatails = document.querySelector('.user-details');
        
        this.asyncHandler();
        
       
    }

    asyncHandler=async()=>{
        try{
            this.setContainer();
            this.information = document.querySelector('.information');
            this.datePersonaleBtn = document.querySelector('.date-personale-btn');
            this.istoricComenziBtn = document.querySelector('.istoric-comenzi-btn');

           this.datePersonaleBtn.addEventListener('click', async()=>{ await this.handleDatePersonale(); });
           this.istoricComenziBtn.addEventListener('click',async()=>{ await this.handleIstoricComenzi(); });


        }catch(e){
            console.log(e);
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

            <section class="user-details">
                <h1>User details</h1>
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

    setContainer=()=>{
        this.userDatails.innerHTML +=
        `
        <section class="container">
            <section class="panel">
                <a href="#" class="date-personale-btn">Date personale</a>
                <a href="#" class="istoric-comenzi-btn">Istoric comenzi</a>
            </section>

            <section class="information">

            </section>
        </section>
        `;
    }

    getOrdersDetails =async(id)=>{
        let allOrderDetails = await this.data.getOrdersDetailsByOrderId(id);
        let container = document.querySelector('.comanda');
        
        let before = document.querySelector('.pret-comanda');
        
        for(let orderDetails of allOrderDetails){
            
            let produs = await this.data.getProductById(orderDetails.product_id);

            let p = document.createElement('p');
            
            p.textContent = `${produs.name}, cantitate: ${orderDetails.quantity}`;
            
            container.insertBefore(p,before);

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

    handleDatePersonale=async()=>{

        let user = await this.data.getCustomerById(this.clientId);
        this.information.innerHTML = '';
        this.information.innerHTML += 
        `
            <p  class="user-name"> <span>Nume:</span> ${user.name}</p>
            <p  class="user-email"><span>Email:</span> ${user.email}</p>
            <p  class="user-address"><span>Address:</span> ${user.billing_address}</p>
            <p  class="user-phone"><span>Phone:</span> ${user.phone}</p>

        `
    }

    handleIstoricComenzi=async()=>{

        let allOrders = await this.data.getOrdersByClientId(this.clientId);

        this.information.innerHTML = '';
        if(allOrders.length == 0 ){
            let p = document.createElement('p');
            p.textContent= 'Nu exista comenzi deocamdata';
            this.information.appendChild(p);
            p.style.color = 'white';
            p.style.textAlign ='center';
        }


        for(let order of allOrders){
            
            this.information.innerHTML += 
            `
            <section class="comanda" id="${order.id}">
                <p class="numar-comanda"><span>Numar comanda:</span> ${order.id}</p>
                <p class="produse-comanda"><span>Produse cumparate:</span></p>
                <p class="pret-comanda"> <span>Pret comanda:</span> ${order.ammount} Lei</p>
                <a class="anulare-comanda" href="#">Anulare comanda</a>
            </section>
            `
            
            await this.getOrdersDetails(order.id);

        }

        this.information.addEventListener('click', async(e)=>{ await this.handleAnulareComanda(e) });

    }

    handleAnulareComanda=async(e)=>{
        let obj = e.target;

        if(obj.classList.contains('anulare-comanda')){

            let id = obj.parentNode.getAttribute('id');
            let orderDetails = await this.data.getOrdersDetailsByOrderId(id);

            for(let e of orderDetails){

                if(e.order_id == id){
                    await this.data.deleteOrderDetails(e.id);
                }
            }

            this.data.deleteOrder(id);
            
            let toateComenzile = document.querySelectorAll('.comanda');
            for(let dom of toateComenzile){
                if(dom.getAttribute('id') == id){

                    this.information.removeChild(dom);

                    let p = document.createElement('p');
                    p.textContent = `Comanda cu nr ${id} a fost anulata!`;
                    p.style.color = '#565656';
                    p.style.textAlign = 'center';
                    this.information.appendChild(p);
                }
            }

        }

    }
    
    handleBrand=()=>{
        let nou = new viewUserInterface(this.clientId);
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

    handleCardBtn=()=>{
        let nou = new viewCart(this.clientId);
    }

    handleLogOut=()=>{
        let nou = new viewHome();
    }


}