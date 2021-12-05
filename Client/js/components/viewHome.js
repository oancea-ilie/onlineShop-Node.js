import viewRegister from "./viewRegister.js"
import viewLogin from "./viewLogin.js"
import Data from "../data.js";

export default class viewHome{
    constructor(){
        this.body = document.querySelector('body');
        this.header();
        this.main();
        this.footer();
        this.registerBtn = document.querySelector('.register-btn');
        this.loginBtn = document.querySelector('.login-btn');
        this.toggleBtn = document.querySelector('.toggle-btn');
        this.bars = document.querySelector('.fa-bars');
        this.toggleSection = document.querySelector(".toggle-section");
        this.onOf = 0;
        this.brand = document.querySelector('.brand');
        this.searchBtn = document.querySelector('.search-btn');
        this.searchInput = document.querySelector('.search-input');
        this.categorii = document.querySelector('.main-container-categorii');
        this.navbar = document.querySelector('.navbar');

        this.toggleBtn.addEventListener("click",this.handleToggleBtn);
        this.registerBtn.addEventListener('click',this.handleRegister);
        this.loginBtn.addEventListener('click',this.handleLogin);

        this.data = new Data();
        this.productFunctionality();
    }

    productFunctionality= async()=>{
        try{
            await this.setCategories();
            await this.setProductsToCategories();
            await this.setToggleCategories();
            await this.setNavbar();

            this.favorite = document.querySelectorAll('.main-card-categorie i');
            this.handleFavorite();

            this.allProducts = document.querySelectorAll('.main-card-categorie');
            this.handleAllProducts();

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
                    <a href="#" class="favorite-btn" style="display: none;"><i class="far fa-heart"></i></a>
                    <span class="notificare"></span>
                    <a href="#" class="cart-btn" style="display: none;"><i class="fas fa-shopping-cart"></i></a>
                    <a href="#" class="register-btn"><i class="fas fa-user-plus"></i></a>
                    <a href="#" class="login-btn"><i class="fas fa-user-tie"></i></a>
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
            <section class="main-img-container">                
            </section>

            <section class="main-avantaje">
                <h2 class="title">Avantaje</h2>
                <section class="main-avantaje-card">
                    <i class="fas fa-hand-holding-usd"></i>
                    <p>Economisesti bani</p>
                </section>

                <section class="main-avantaje-card">
                    <i class="fas fa-shield-alt"></i>
                    <p>Garantie extinsa</p>
                </section>
                <section class="main-avantaje-card">
                    <i class="fas fa-truck"></i>
                    <p>Transport gratuit</p>
                </section>
            </section>

            <section class="main-container-categorii">
            
            </section>
        </main>
        `
    }

    footer=()=>{
        this.body.innerHTML +=
        `
        <footer>
            <p>Copyright © 2021 | Oancea Ilie</p>
            <section class="footer-social">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-youtube"></i></i></a>
            </section>
        </footer>
        `
    }
    
    setCategories = async()=>{
        this.categorii.innerHTML = '';
        let categories = await this.data.getCategories();

        if(categories){
            for(let c of categories){
                this.categorii.innerHTML +=
                `
                    <h2 class="title">${c.description}</h2>
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
        categorie.innerHTML +=
        `
        <section class="main-card-categorie">
            <img src="${product.image}" alt="">
            <i class="far fa-heart"></i>
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <h3 class="pret-produs">${product.price} Lei</h3>
        </section>
        `;
    }

    handleAllProducts=()=>{
        this.allProducts.forEach(e=>{
            e.addEventListener('click',()=>{
                let nou = new viewLogin();
            })

        });
    }

    handleRegister=()=>{
        let nou = new viewRegister();
    }

    handleLogin=()=>{
        let nou = new viewLogin();
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

    handleFavorite=()=>{
        this.favorite.forEach((e)=>{
            e.addEventListener('mouseover',()=>{
                e.classList.remove('far');
                e.classList.remove('fa-heart');
        
                e.classList.add('fas');
                e.classList.add('fa-heart');
            });
        
            e.addEventListener('mouseout',()=>{
                e.classList.remove('fas');
                e.classList.remove('fa-heart');
        
                e.classList.add('far');
                e.classList.add('fa-heart');
            });
            e.addEventListener('click',()=>{
                let nou = new viewLogin();
            });
        })
    }

}