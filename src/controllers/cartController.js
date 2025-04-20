let productService = new(require("../services/productService"))();
let cartService = new(require("../services/cartService"))();

module.exports = class CartController {

    list(user){
        return new Promise(async(resolve, reject) => {
            try {        
                let products = await cartService.list(user.id);
                resolve(products);
            } catch (error) {
                reject(error)
            }
        })
    }
    calcPrice(products){
        return products.reduce(
            (accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity),
            0,
          )  
    }
    getUserCart(user){
        return new Promise(async(resolve, reject) => {
            try {        
                let products = await this.list(user);
                let totalPrice = this.calcPrice(products);
                resolve({products :products, totalPrice});
            } catch (error) {
                reject(error)
            }
        })
    }
    removeProduct(user,productId){
        return new Promise(async(resolve, reject) => {
            try {        
                let products = await this.list(user);
                let filteredProducts = products.filter(prod => prod.productId !=productId);
                await cartService.update(filteredProducts);
                let totalPrice = this.calcPrice(filteredProducts);
                resolve({products :filteredProducts, totalPrice});
            } catch (error) {
                reject(error)
            }
        })
    }
    addProduct(user,product){
        return new Promise(async(resolve, reject) => {
            try {        
                let productList = await this.checkProductAvailabilty(product);
                let products = await cartService.listWithoutProjection(user.id);
                let index = products.findIndex(prod => prod.productId == product.productId);
                if(index > -1){
                    products[index].quantity += product.quantity;
                }else{
                    products.push({userId:user.id,...product});
                }
                await cartService.update(products);
                await productService.update(productList,product);
                products = await this.list(user);
                let totalPrice = this.calcPrice(products);
                resolve({products :products, totalPrice});
            } catch (error) {
                reject(error)
            }
        })
    }
    checkProductAvailabilty(_product){
        return new Promise(async(resolve, reject) => {
            try {        
                let products = await productService.list();
                let index = products.findIndex(prod => prod.productId == _product.productId);
                if(index > -1 && products[index].quantity >= _product.quantity){
                    products[index].quantity -= _product.quantity;
                    resolve(products);
                }else{
                    reject("product quantity not available");
                }
            } catch (error) {
                reject(error)
            }
        })
    }
}