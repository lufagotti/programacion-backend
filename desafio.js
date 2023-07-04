class ProductManager {
    constructor(){
        this.products = [];
    }

    static id = 0
    
    addProducts(title, description, price, img, code, stock){
        for(let i = 0; i < this.products.length; i++){
            if(this.products[i].code === code){
                console.log(`el codigo ${code} esta repetido`)
                break;
            }
        }

        ProductManager.id++
        this.products.push({title, description, price, img, code, stock, id: ProductManager.id});
    }

    getProduct(){
        return this.products;
    }

    foundId(id){
        return this.products.find((prod)=> prod.id === id)
    }

    getProductById(id){
        !this.foundId(id) ? console.log("not found") : console.log(this.foundId(id));
    }
}

const productos = new ProductManager();

productos.addProducts("product1", "description1", 2000, "img1", "prod1", 10);
productos.addProducts("product2", "description2", 2000, "img2", "prod1", 10);


console.log(productos.getProduct())
productos.getProductById(2)

