import { Router } from "express";
import { __dirname } from "../utils.js";
import ProductManager from "../dao/mongoManagers/productManagerMongo.js";
const pmanager =new ProductManager()
// import ProductManager from "../dao/filemanagers/controllers/productManager.js";
// const pmanager=new ProductManager(__dirname+"/dao/filemanagers/db/products.json")

const router =Router()


// router.get("/",async(req,res)=>{
//     const listadeproductos=await pmanager.readProducts({})
//     console.log(listadeproductos)
//     res.render("home",{listadeproductos})
// })

router.get("/",async(req,res)=>{
        const listadeproductos=await pmanager.readProducts()
        console.log(listadeproductos)
        res.render("home",{listadeproductos})
    })

router.get("/realTimeProducts",(req,res)=>{
    res.render("realTimeProducts")
})

router.get("/chat",(req,res)=>{
    res.render("chat")
})


export default router
