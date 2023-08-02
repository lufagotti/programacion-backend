import {Router} from "express"
import { __dirname } from "../src/utils.js";
import CartManager from "../src/components/cartManager.js";

const carrito = new CartManager(__dirname+"/files/carts.json");
// const allProducts = productos.readProducts()


const router = Router()

router.get("/carts", async (req, res) => {
    let listOfCarts = await carrito.readCarts();
    res.json({message: "success", listOfCarts})
})

router.get("/carts/:cid", async (req, res) =>{
    let cartById = await carrito.getCartsById(req.params)
    res.send({message: "success", cartById})
})

router.post("/carts", async (req, res) =>{
    let newCart = await carrito.addCart(req.body)
    res.send({message: "success", newCart})
})

router.post("/carts/:cid/products/:pid", async (req, res) =>{
    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)
    const addProdToCart = await carrito.addProductToCart(cid,pid)
    res.send({message: "success",addProdToCart})
})

export default router