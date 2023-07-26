import express from "express"
import prodRoute from "../routes/products.router.js"
import cartRoute from "../routes/carts.router.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}));

app.use(express.Router())
app.use("/api", prodRoute)
app.use("/api", cartRoute)


const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Express por Local Host ${server.address().port}`);
})
server.on("error", (error) => console.log(`Error en el servidor ${error}`))