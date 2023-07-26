import {Router} from "express"
import { __dirname } from "../utils.js";
import ProductManager from "../src/components/productManager.js"

const productos = new ProductManager(__dirname+"/files/products.json");
// const allProducts = productos.readProducts()


const router = Router()

router.get("/products", async (req, res) => {
    let listOfProd = await productos.readProducts(req.query);
    res.json({message: "success", listOfProd})
})

router.get("/products/:pid", async (req, res) =>{
    let prodById = await productos.getProductsById(req.params)
    res.send({message: "success", prodById})
})

router.post("/products", async (req, res) =>{
    let newProd = await productos.addProduct(req.body)
    res.send({message: "success", newProd})
})

router.put("/products/:pid", async (req, res) =>{
    console.log(req.params)
    const upgradeProd = await productos.updateProduct(req.params, req.body)
    res.send({message: "success",upgradeProd})
})

router.delete("/products/:pid", async (req, res) =>{
    let deleteProd = await productos.deleteProducts(req.params)
    res.send({message: "success", deleteProd})
})

export default router