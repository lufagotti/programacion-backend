import {promises as fs} from "fs"

export default class ProductManager {
    constructor(){
        this.patch = "./products.txt"
        this.products = []
    }
    static id = 0
    
    addProduct = async (title, description, price, img, code, stock) => {
        ProductManager.id++
        let newProduct = {
            title,
            description,
            price,
            img,
            code,
            stock,
            id: ProductManager.id
        }
        this.products.push(newProduct)
        await fs.writeFile(this.patch, JSON.stringify(this.products))
    }

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuestaGP = await this.readProducts()
        return console.log(respuestaGP)
    }

    getProductsById = async (id) => {
        let respuestaBI = await this.readProducts()
        let filter = respuestaBI.find(prod => prod.id === id)
        if (!filter){
            console.log("El producto no existe")
        }else{
            console.log(filter)
        }
    }

    deleteProducts = async (id) => {
        let respuestaDP = await this.readProducts()
        let prodFilter = respuestaDP.filter(prod => prod.id != id)
        await fs.writeFile(this.patch, JSON.stringify(prodFilter))
        console.log("El producto se elimino")
    }

    updateProduct = async ({id, ...prod}) => {
        await this.deleteProducts(id)
        let prodSave = await this.readProducts();
        let prodModified = [{id, ...prod}, ...prodSave]
        await fs.writeFile(this.patch, JSON.stringify(prodModified))
    }
}

const productos = new ProductManager();

// productos.addProduct("producto1", "description1", 1000, "img1", "PROD1", 20)
// productos.addProduct("producto2", "description2", 1500, "img2", "PROD2", 10)
// productos.addProduct("producto3", "description3", 2500, "img3", "PROD3", 15)
// productos.addProduct("producto4", "description4", 1000, "img4", "PROD4", 25)
// productos.addProduct("producto5", "description5", 1500, "img5", "PROD5", 35)
// productos.addProduct("producto6", "description6", 2500, "img6", "PROD6", 30)
// productos.addProduct("producto7", "description7", 1000, "img7", "PROD7", 40)
// productos.addProduct("producto8", "description8", 1500, "img8", "PROD8", 45)
// productos.addProduct("producto9", "description9", 2500, "img9", "PROD9", 50)


// productos.getProducts()
// productos.getProductsById(8)
// productos.deleteProducts(1)
// productos.updateProduct({
//     title: 'producto3',
//     description: 'description3',
//     price: 4500,
//     img: 'img3',
//     code: 'PROD3',
//     stock: 15,
//     id: 3
// })