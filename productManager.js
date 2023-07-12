import {promises as fs} from "fs"

class ProductManager {
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

    // getProductsById = async (id) => {
    //     let respuestaBI = await this.readProducts()
    //     let filter = respuestaBI.find(prod => prod.id === id)
    //     if (!filter){
    //         console.log("El producto no existe")
    //     }else{
    //         console.log(filter)
    //     }
    // }

    // deleteProducts = async (id) => {
    //     let respuestaDP = await this.readProducts()
    //     let prodFilter = respuestaDP.filter(prod => prod.id != id)
    //     await fs.writeFile(this.patch, JSON.stringify(prodFilter))
    //     console.log("El producto se elimino")
    // }

    // updateProduct = async ({id, ...prod}) => {
    //     await this.deleteProducts(id)
    //     let prodModified = []
    // }
}

const productos = new ProductManager();

// productos.addProduct("producto1", "description1", 1000, "img1", "PROD1", 20)
// productos.addProduct("producto2", "description2", 1500, "img2", "PROD2", 10)
// productos.addProduct("producto3", "description3", 2500, "img3", "PROD3", 15)


productos.getProducts()
// productos.getProductsById(4)
// productos.deleteProducts(1)
// productos.updateProduct({
//     title: 'producto2',
//     description: 'description2',
//     price: 2500,
//     img: 'img2',
//     code: 'PROD2',
//     stock: 10,
//     id: 2
// })