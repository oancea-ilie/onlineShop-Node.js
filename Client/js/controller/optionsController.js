import Options from "../model/options.js";

export default class OptionsController{
    constructor(){
        this.arr =JSON.parse(localStorage.getItem("options"));
        this.list=[];
        this.toObject();
    }

    toObject=()=>{
        this.arr.forEach(e => {
            this.list.push(new Options(e.id,e.option_name));
        });
    }

    reload=()=>{
        localStorage.setItem('options',JSON.stringify(this.list));
    }

    create=(option)=>{
        this.list.push(option);

        this.reload();
    }

    delete=(id)=>{
        this.list = this.list.filter(e=>e.id!==id);

        this.reload();
    }

    getItemById=(id)=>{
        for(let i of this.list){
            if(i.id == id){
                return i;
            }
        }
    }

    updateOptionName=(id,newOptionName)=>{
    
        let obj = this.getItemById(id);

        obj.option_name = newOptionName;

        this.reload();
    }

}