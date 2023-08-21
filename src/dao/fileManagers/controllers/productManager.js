import fs from "fs"

export default class ProductManager {
    constructor(){
        this.patch = "./src/dao/fileManagers/db/products.json"
    }

    generateId = async () => {
        try {
            if (fs.existsSync(this.patch)) {
                const productlist = await fs.promises.readFile(this.patch, "utf-8");
                const productlistJs = JSON.parse(productlist);
                const counter = productlistJs.length;
            if (counter == 0) {
                return 1;
            } else {
                return productlistJs[counter - 1].id + 1;
            }
        }
        } catch (error) {
            throw new Error(error);
        }
    };
    
    addProduct = async (obj) => {
        const {title, description, price, thumbnail, category, status=true, code, stock} = obj
        if(title===undefined || description===undefined || price===undefined || category===undefined || code===undefined || status===undefined || stock===undefined){
            console.error("Ingrese todos los datos del producto");
            return;
        }else{
            const prodlist = await this.readProducts({})
            const coderepeated = prodlist.find((el) => el.code === code)
            if(coderepeated){
                console.error("El codigo del producto es repetido");
                return;
            }else{
                const id = await this.generateId()
                let newProduct = {
                    id,
                    title,
                    description,
                    price,
                    thumbnail,
                    category,
                    status,
                    code,
                    stock
                }
                prodlist.push(newProduct)
                await fs.promises.writeFile(this.patch, JSON.stringify(prodlist, null, 2))
            }
        }
    }

    readProducts = async (info) => {
        let {limit} = info ?? {}
        try{
            if(fs.existsSync(this.patch)){
                let respuesta = await fs.promises.readFile(this.patch, "utf-8")
                let prodListParse = JSON.parse(respuesta)
                const prodListSlice = prodListParse.slice(0, limit);
                return prodListSlice
            }else{
                throw new Error(error)
            }
        }
        catch(error){
            throw new Error(error)
        }
    }

    getProducts = async () => {
        let respuestaGP = await this.readProducts()
        return console.log(respuestaGP)
    }

    getProductsById = async (id) => {
        const {pid} = id
        let respuestaBI = await this.readProducts({})
        let filter = respuestaBI.find(prod => prod.id === parseInt(pid))
        if (!filter){
            console.error("El producto no existe")
        }else{
            return filter
        }
    }

    deleteProducts = async (pid) => {
        let allProducts = await this.readProducts({})
        let prodFilter = allProducts.filter(prod => prod.id != parseInt(pid))
        await fs.promises.writeFile(this.patch, JSON.stringify(prodFilter, null, 2))
        console.log("El producto se elimino")
    }

    updateProduct = async (id, obj) => {
        const {pid} = id
        const {title,description,price,thumbnail,category,status,code,stock} = obj
        if( title===undefined || description===undefined || price===undefined || thumbnail===undefined || category===undefined || status===undefined || code===undefined || stock===undefined){
            console.error("Ingrese todos los datos del producto para su actualizacion")
            return
        }else{
            const prodSave = await this.readProducts({});
            const codeRepetead = prodSave.find(el=>el.code === code)
            if(codeRepetead){
                console.error("El codigo del producto a actualizar es repetido")
                return
            }else{
                const currentProdList = await this.readProducts()
                // console.log(currentProdList)
                const newProdList = currentProdList.map(elemento=>{
                    if(elemento.id=== parseInt(pid)){
                        const updatedProd={
                            ...elemento,
                            title,description,price,thumbnail,code,status,category,stock
                        }
                        // console.log(updatedProd)
                        return updatedProd
                    }else{
                        return elemento
                    }
                })
                const result = await fs.promises.writeFile(this.patch, JSON.stringify(newProdList, null, 2))
                // console.log(result)
            }
        }
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