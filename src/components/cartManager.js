import fs from "fs"

export default class CartManager {
    constructor(){
        this.patch = "./files/carts.json"
    }
    
    readCarts = async () => {
        if(fs.existsSync(this.patch)){
            let respuesta = await fs.promises.readFile(this.patch, "utf-8")
            let cartListParse = JSON.parse(respuesta)
            return cartListParse
        }else{
            return []
        }
    }

    getCarts = async () => {
        let respuestaGP = await this.readCarts()
        return console.log(respuestaGP)
    }

    getCartsById = async (id) => {
        const {cid} = id
        let respuestaBI = await this.readCarts()
        let filter = respuestaBI.find(cart => cart.id === parseInt(cid))
        if (!filter){
            console.error("El carrito no encontrado")
        }else{
            return filter
        }
    }

    generatecartId=async()=>{
        try {
            if (fs.existsSync(this.patch)) {
                const cartlist = await fs.promises.readFile(this.patch, "utf-8");
                const cartlistJs = JSON.parse(cartlist);
                const counter = cartlistJs.length;
            if (counter == 0) {
                return 1;
            } else {
                    return cartlistJs[counter - 1].id + 1;
            }
        }
        } catch (error) {
            throw new Error(error);
        }
    }

    addProductToCart = async (cid, pid) => {
            const listCart = await this.readCarts();
            const cart = listCart.find(el=> el.id===cid)
                const prodIndex = cart.products.findIndex(element=> element.pid === pid);
                if(prodIndex !==-1){
                    cart.products[prodIndex].quantity++
                }else{
                    cart.products.push({
                        pid,
                        quantity:1
                    })
                }
            await fs.promises.writeFile(this.patch, JSON.stringify(listCart, null, 2))
        }

    addCart = async () => {
        const cartList = await this.readCarts()
        const id = await this.generatecartId()
        let newCart = {
            id,
            products:[]
            }
            cartList.push(newCart)
            await fs.promises.writeFile(this.patch, JSON.stringify(cartList, null, 2))
        }
    }









const carrito = new CartManager();