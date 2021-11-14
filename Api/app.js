import express from "express"
import cors from "cors"
import customerRouter from "./routes/customersRoute.js";
import categoriesRouter from "./routes/categoriesRoute.js";
import optionsRouter from "./routes/optionsRoute.js";
import orderDetailsRouter from "./routes/orderDetailsRoute.js";
import orderRouter from "./routes/orderRoute.js";
import productCategoriesRouter from "./routes/productCategoriesRoute.js"
import productOptionsRouter from "./routes/productOptionsRoute.js";
import productsRouter from "./routes/productRoute.js"

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());


app.use("/api/customers", customerRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/options', optionsRouter);
app.use('/api/orders/details', orderDetailsRouter);
app.use('/api/orders', orderRouter);
app.use('/api/products/categories', productCategoriesRouter);
app.use('/api/products/options', productOptionsRouter);
app.use('/api/products', productsRouter);


app.listen(3000, ()=>{
    console.log('Api listening on port 3000 !');
});