import express from "express"
import ProductManager from "./components/productManager.js"

const app = express()
app.use(express.urlencoded({extended : true}));

const productos = new ProductManager();
const allProducts = productos.readProducts()

app.get("/products", async (req, res) => {
    let limit = parseInt(req.query.limit);
    if(!limit) return res.send(await allProducts)
    let prodAll = await allProducts;
    let limitProd = prodAll.slice(0, limit)
    res.send(limitProd);
})

app.get("/products/:id", async (req, res) =>{
    let id = parseInt(req.params.id);
    let prodAll = await allProducts;
    let prodById = prodAll.find(product => product.id === id)
    res.send(prodById)
})

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Express por Local Host ${server.address().port}`);
})
server.on("error", (error) => console.log(`Error en el servidor ${error}`))