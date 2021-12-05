import Data from "../data.js";
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

        this.homeBtn = document.querySelector('.home-btn');
        this.homeBtn.addEventListener('click',this.handleHome);

        this.data = new Data();

        this.eror = document.querySelector('.eror');
        this.eror.style.color = 'red';
        this.eror.style.textAlign = 'center';

        this.asyncronHandler();
    }


    header=()=>{
        this.body.innerHTML = '';

        this.body.innerHTML =
        `
        <section class="register-header">
            <h1>ONLINE SHOP</h1>
        </section>
        <section class="register-main">
            <h2>Inregistreaza-te</h2>
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
                <section class="register-btns">
                    <a href="#" class="register-btn">Inregistrare</a>
                    <a href="#" class="home-btn">Home</a>
                </section>
            </section>
        </section>
        `
    }


    asyncronHandler= async()=>{
        try{

            this.registerBtn.addEventListener('click',async()=>{

                let obj = await this.toObj();

                this.handleRegister(obj);
            });

        }catch(e){
            console.log(e);
        }
    }

    toObj=async()=>{

        let nextId = await this.data.CustomerNextId();
        let obj = {
            id: nextId,
            name: this.name.value,
            email: this.email.value,
            password: this.pass.value,
            billing_address: this.adress.value,
            phone: this.phone.value
        }

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

    handleRegister=(obj)=>{
        let ok = this.RegisterCeck();

        if(ok == 0){
            this.data.addCustomer(obj);


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