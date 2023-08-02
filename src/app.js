import express from "express"
import viewRoute from "../routes/view.router.js"
import prodRoute from "../routes/products.router.js"
import cartRoute from "../routes/carts.router.js"
import { __dirname } from "./utils.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io"

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}));

console.log(__dirname)

app.use(express.static(__dirname+"/public"))

app.engine("handlebars", handlebars.engine())
app.set("view engine","handlebars")
app.set("views", __dirname+"/views")

app.use(express.Router())
app.use("/api", prodRoute)
app.use("/api", cartRoute)
app.use("/", viewRoute)


const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Express por Local Host ${httpServer.address().port}`);
})
httpServer.on("error", (error) => console.log(`Error en el servidor ${error}`))

const socketServer = new Server(httpServer)

import ProductManager from "./components/productManager.js"
const prodManagerSocket = new ProductManager(__dirname+"/files/products.json")

socketServer.on("connection", async (socket)=>{
    console.log("cliente conectado con id:", socket.id)
    const listaDeProd = await prodManagerSocket.readProducts({})
    socketServer.emit("enviodeprod", listaDeProd)

    socket.on("addProduct", async(obj)=>{
        await prodManagerSocket.addProduct(obj)
        const listaDeProd = await prodManagerSocket.readProducts({})
        socketServer.emit("enviodeprod", listaDeProd)
    })

    socket.on("deleteProduct", async(id)=>{
        console.log(id)
        await prodManagerSocket.deleteProducts(id)
        const listaDeProd = await prodManagerSocket.readProducts({})
        socketServer.emit("enviodeprod", listaDeProd)
    })
})