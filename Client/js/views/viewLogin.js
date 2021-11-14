import CustomersController from "../controller/customersController.js";
import viewHome from "./viewHome.js";
import viewUserInterface from "./viewUserInterface.js";

export default class viewLogin{
    constructor(){

        this.body = document.querySelector('body');

        this.header();

        this.email = document.querySelector('.login-email');
        this.pass = document.querySelector('.login-pass');

        this.loginBtn = document.querySelector('.login-btn');
        this.loginBtn.addEventListener('click', this.handleLogin);

        this.homeBtn = document.querySelector('.home-btn');
        this.homeBtn.addEventListener('click',this.handleHome);

        this.customerController = new CustomersController();
    }

    header=()=>{
        this.body.innerHTML = '';

        this.body.innerHTML = 
        `
        <section class="register-header">
        <h1>ONLINE SHOP</h1>
        </section>
        <section class="register-main">
            <h2>Conecteaza-te</h2>
            <section class="register-container">
                <p>Email:</p>
                <input type="text" class="login-email">
                <p>Parola:</p>
                <input type="password" class="login-pass">
                <a href="#" class="login-btn">Conecteaza-te</a>
                <a href="#" class="home-btn">Home</a>
            </section>
        </section>
        `;
    }

    loginCheck=()=>{
        let ok = 0;

        for(let obj of this.customerController.list){
            if(obj.email == this.email.value && obj.password ==this.pass.value){
                let nou = new viewUserInterface(obj.name);
            }
        }

        return ok;
    }

    handleLogin=()=>{
        this.loginCheck();

    }

    handleHome=()=>{
        let nou = new viewHome();
    }
}