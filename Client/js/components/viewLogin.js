import viewHome from "./viewHome.js";
import viewUserInterface from "./viewUserInterface.js";
import Data from "../data.js";

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

        this.data = new Data();

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

    handleLogin=async()=>{

        try{
            let customers = await this.data.getCustomers();

            for(let obj of customers){
                if(obj.email == this.email.value && obj.password == this.pass.value){
                    let nou = new viewUserInterface();
                }
            }

        }catch(e){
        
            console.log(e);
        }


    }

    handleHome=()=>{
        let nou = new viewHome();
    }

}