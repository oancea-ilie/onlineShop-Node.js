import CustomersController from "../controller/customersController.js";
import Customers from "../model/customers.js";
import viewHome from "./viewHome.js";


export default class viewRegister{
    constructor(){

        this.body = document.querySelector('body');

        this.header();

        this.name = document.querySelector('.name-register');
        this.email = document.querySelector('.email-register');
        this.pass = document.querySelector('.pass-register');
        this.adress = document.querySelector('.address-register');
        this.phone = document.querySelector('.phone-register');

        this.registerBtn = document.querySelector('.register-btn');
        this.registerBtn.addEventListener('click',this.handleRegister);

        this.homeBtn = document.querySelector('.home-btn');
        this.homeBtn.addEventListener('click',this.handleHome);

        this.customerController = new CustomersController();

        this.eror = document.querySelector('.eror');
        this.eror.style.color = 'red';
        this.eror.style.textAlign = 'center';

    }


    header=()=>{
        this.body.innerHTML = '';

        this.body.innerHTML =
        `
        <section class="register-header">
            <h1>ONLINE SHOP</h1>
        </section>
        <section class="register-main">
            <h2>Inregistrare</h2>
            <p class="eror"></p>
            <section class="register-container">
                <p>Nume:</p>
                <input type="text" class="name-register">
                <p>Email:</p>
                <input type="text" class="email-register">
                <p>Parola:</p>
                <input type="password" class="pass-register">
                <p>Adresa:</p>
                <input type="text" class="address-register">
                <p>Telefon:</p>
                <input type="tel" class="phone-register">
                <a href="#" class="register-btn">Inregistrare</a>
                <a href="#" class="home-btn">Home</a>
            </section>
        </section>
        `
    }

    toObj=()=>{
        let id =this.customerController.list[this.customerController.list.length-1].id + 1;
        let obj =  new Customers(id,this.name.value,this.email.value,this.pass.value,this.adress.value,this.phone.value);
        return obj;
    }

    RegisterCeck=()=>{
        let ok = 0;
        if(this.name.value =='' || this.email.value ==''  || this.pass.value ==''  || this.adress.value ==''  || this.phone.value ==''){
            this.eror.textContent = 'You must fill all the inputs!';
            ok = 1;
        }

        return ok;
    }

    handleRegister=()=>{
        let ok = this.RegisterCeck();

        if(ok == 0){
            let obj = this.toObj();
            this.customerController.create(obj);
            this.eror.innerHTML = `Registration complete!<br>You can Login In now!`;
            this.eror.style.color = 'green';

            setTimeout(()=>{
                let nou = new viewHome();
            },3000);
        }
    }

    handleHome=()=>{
        let nou = new viewHome();
    }

}