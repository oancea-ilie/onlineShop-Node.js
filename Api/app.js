import express from "express"
import cors from "cors"
import customerRouter from "./routes/customersRoute.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.use(cors());

app.use("/api/customers", customerRouter);

app.listen(3000, ()=>{
    console.log('Api listening on port 3000 !');
});