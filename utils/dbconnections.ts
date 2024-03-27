import mongoose from "mongoose";

class DbConnection{
    private url: string;
    
    constructor(url:string){
        this.url = url;
    }

    private async Setconnect(){
        try{
            await mongoose.connect(this.url);
            console.log("connect to db success");
        }catch(err){
            console.log("failed connect to databse");
        }
    }

    public connect(){
        this.Setconnect();
    }
}


export default DbConnection