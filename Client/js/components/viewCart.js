import viewHome from "./viewHome.js"
import viewUserInterface from "./viewUserInterface.js";
import viewProduct from "./viewProduct.js";
import viewFavorite from "./viewFavorite.js";
import Data from "../data.js";


export default class viewCart{
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

        this.favoriteBtn = document.querySelector('.favorite-btn');
        this.favoriteBtn.addEventListener('click',this.handleBigFavorite);

        //main
        this.data = new Data();
        this.setToggleCategories();

        this.cosGolText = document.querySelector('.cos-gol-text');
        this.cosGolImg = document.querySelector('.cos-gol-img');

        this.container = document.querySelector('.cart-container'); 


        this.getAllProducts();

        // nu e asyncrona !!! nu stiu de ce nu se asteapta dupa this.getAllProducts();
        this.allProducts = document.querySelectorAll('.cart-product');
        console.log(this.allProducts);

        // this.closeBtns = document.querySelectorAll(".cart-product i");
        // this.handleCloseBtn();
        // this.handlePriceProducts();
        // this.handleTotalPrice();
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
        <main>

        <section class="toggle-section">

        </section>

            <section class="cart-container">
                <img src="svg/sad.svg" class="cos-gol-img">
                <p class="cos-gol-text">Ups,cardul este gol!</p>

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

    getAllProducts= async()=>{

        let allProducts = await this.data.getProducts();

        let filtrat = allProducts.filter(e=>e.cartStatus == true);

        filtrat.forEach(e=>this.setProduct(e));
        

        if(filtrat.length >0){
            this.setCartSumar();
            this.cosGolImg.style.display = 'none';
            this.cosGolText.style.display = 'none';


        }else{
            this.cosGolImg.style.display = 'block';
            this.cosGolText.style.display = 'block';
        }
    }

    setProduct=(obj)=>{
        this.container.innerHTML +=
        `
        <section class="cart-product card-pc">
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
            <h3 class="pret-produs-cart">Total: ${obj.price} Lei</h3>
        </section>
        `

    }

    setCartSumar=(obj)=>{
        
        this.container.innerHTML +=
        `
        <section class="cart-sumar">
            <p>Cost produse: <span class="cost-total-produse">230120 Lei</span> lei</p>
            <p>Cost livrare: <span class="cost-livrare-produse">15</span> lei</p>
            <p class="total-cost-produse">Total: 4015 lei</p>
            <a href="#">Trimite comanda <i class="fas fa-angle-double-right"></i></a>
        </section>
        `
    }

    handlePriceProducts=()=>{
        this.allProducts.forEach(e=>{
            let select = e.children[3];
            let pretProdus = e.children[4];
            let currentProduct = this.productController.getProductByName(e.children[2].textContent);

            select.addEventListener('change',()=>{
                let pretNou = parseInt(currentProduct.price) * parseInt(select.value);
                pretProdus.textContent = `Total: ${pretNou} Lei`;

                this.handleTotalPrice();
            });

        })

    }

    handleTotalPrice=()=>{
        this.allProducts = document.querySelectorAll('.cart-product');
        if(this.allProducts.length >2){
            let aux = 0;
            this.allProducts.forEach(e=>{
                let pretProdus = e.children[4].textContent;
                let pretNou = pretProdus.split(' ');
                let pretFinal = parseInt(pretNou[1]);
    
                aux += pretFinal;
            });
    
            let costProduse = document.querySelector('.cost-total-produse');
                costProduse.textContent = aux;
            
            let costLivrare = document.querySelector(".cost-livrare-produse").textContent;
    
            let total = document.querySelector('.total-cost-produse');
    
            total.textContent =` ${ parseInt(costProduse.textContent) + parseInt(costLivrare)} Lei`;
        }


    }

    handleBrand=()=>{
        let nou = new viewUserInterface(this.username);
    }

    handleCloseBtn=()=>{
        this.closeBtns.forEach(e=>{
            e.addEventListener('click',()=>{
                let productName = e.parentNode.children[2].textContent;
                let parent = e.parentNode;
                this.container.removeChild(parent);
                this.productController.setProductCartStatus(productName,0);

                this.handleTotalPrice();
                let cartProduct = document.querySelector('.cart-product');

                if(cartProduct == null){
                    let cartSumar = document.querySelector('.cart-sumar');
                    this.container.removeChild(cartSumar);

                    //ASTEA 2 NU MERG!
                    this.cosGolText.style.display = 'block';
                    this.cosGolImg.style.display = 'block';
                }
            });
        })
    }
    
    handleBigFavorite=()=>{
        let nou = new viewFavorite(this.username);
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