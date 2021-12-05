

export default class Data{
    constructor(){

    }

    api(path ,method='GET',body=null){

       let url=path;
        const options={
              
            method,
            headers:{
                'Content-Type':'application/json;charset=utf-8',
            }
        };

        if(body!=null){

            options.body=JSON.stringify(body);

        }

        return fetch(url,options);
    }

    // VIEW HOME
    async getProducts(){

         try{
            const response =await this.api("http://localhost:3000/api/products");
            if(response.status==200){
                return response.json();

            }else{

                return null;
            }

         }catch(e){

            console.log(e);

         }
    }

    async getCategories(){
        try{
           const response =await this.api("http://localhost:3000/api/categories");
           if(response.status==200){
               return response.json();

           }else{

               return null;
           }

        }catch(e){

           console.log(e);

        }
    }

    async getProductsCategoryByCategory(id){

        try{
            const response = await this.api(`http://localhost:3000/api/products/categories/category/${id}`);
            
            if(response.status==200){

                return response.json();

            }else{

                return null;
            }

        }catch(e){

            console.log(e);

        }
    }

    async getProductById(id){
        try{
            const response =await this.api(`http://localhost:3000/api/products/${id}`);

            if(response.status==200){

                 return response.json();

            }else{

                return null;
            }

        }catch(e){

            console.log(e);

        }
    }
    
    // VIEW LOGIN

    async getCustomers(){
        try{
            const response = await this.api("http://localhost:3000/api/customers");
            
            if(response.status==200){
                return response.json();

            }else{

                return null;
            }

         }catch(e){

            console.log(e);

         }
    }

    async updateProduct(id,newProduct){
        try{
            const response = await this.api(`http://localhost:3000/api/products/${id}`,'PUT', newProduct);
            
            if(response.status==200){
                return response.json();

            }else{

                return null;
            }

         }catch(e){

            console.log(e);

         }
    }

    //VIEW REGISTER

    async addCustomer(newCustomer){
        try{
            const response = await this.api(`http://localhost:3000/api/customers/add`,'POST', newCustomer);
            
            if(response.status==200){
                return response.json();

            }else{

                return null;
            }

         }catch(e){

            console.log(e);

         }
    }

    async getOrders(){
        try{
            const response = await this.api("http://localhost:3000/api/orders");
            
            if(response.status==200){
                return response.json();

            }else{

                return null;
            }

         }catch(e){

            console.log(e);

         }
    }

    async addOrder(newOrder){
        try{
            const response = await this.api(`http://localhost:3000/api/orders/add`,'POST', newOrder);
            
            if(response.status==200){
                return response.json();

            }else{

                return null;
            }

         }catch(e){

            console.log(e);

         }
    }

    async addOrderDetails(newOrderDetails){
        try{
            const response = await this.api(`http://localhost:3000/api/orders/details/add`,'POST', newOrderDetails);
            
            if(response.status==200){
                return response.json();

            }else{

                return null;
            }

         }catch(e){

            console.log(e);

         }
    }


    async OrderNextId(){
        try{
            const response = await this.api("http://localhost:3000/api/orders/id/next");
            
            if(response.status==200){
                return response.json();

            }else{

                return null;
            }

         }catch(e){

            console.log(e);

         }
    }

    async CustomerNextId(){
        try{
            const response = await this.api("http://localhost:3000/api/customers/id/next");
            
            if(response.status==200){
                return response.json();

            }else{

                return null;
            }

         }catch(e){

            console.log(e);

         }
    }

    async OrderDetailsNextId(){
        try{
            const response = await this.api("http://localhost:3000/api/orders/details/id/next");
            
            if(response.status==200){
                return response.json();

            }else{

                return null;
            }

         }catch(e){

            console.log(e);

         }
    }

    async ProductCategoriesNextId(){
        try{
            const response = await this.api("http://localhost:3000/api/products/categories/id/next");
            
            if(response.status==200){
                return response.json();

            }else{

                return null;
            }

         }catch(e){

            console.log(e);

         }
    }

    async ProductOptionsNextId(){
        try{
            const response = await this.api("http://localhost:3000/api/products/options/id/next");
            
            if(response.status==200){
                return response.json();

            }else{

                return null;
            }

         }catch(e){

            console.log(e);

         }
    }

    async ProductsNextId(){
        try{
            const response = await this.api("http://localhost:3000/api/products/id/next");
            
            if(response.status==200){
                return response.json();

            }else{

                return null;
            }

         }catch(e){

            console.log(e);

         }
    }

    async CategoriesNextId(){
        try{
            const response = await this.api("http://localhost:3000/api/categories/id/next");
            
            if(response.status==200){
                return response.json();

            }else{

                return null;
            }

         }catch(e){

            console.log(e);

         }
    }

    async OptionsNextId(){
        try{
            const response = await this.api("http://localhost:3000/api/options/id/next");
            
            if(response.status==200){
                return response.json();

            }else{

                return null;
            }

         }catch(e){

            console.log(e);

         }
    }





}