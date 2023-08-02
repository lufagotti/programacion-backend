import { Router } from "express";
import ProductManager from "../src/components/productManager.js";
import { __dirname } from "../src/utils.js";

const prodManager = new ProductManager(__dirname+"../files/products.json")
const router = Router()

router.get("/", async(req,res)=>{
    const listOfProd = await prodManager.readProducts({})
    console.log(listOfProd)
    res.render("home", {listOfProd})
})

router.get("/realTimeProducts",(req,res)=>{
    res.render("realTimeProducts")
})



export default router