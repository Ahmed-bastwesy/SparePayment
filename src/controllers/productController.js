let productService = new(require("../services/productService"))();

module.exports = class ProductController {
    list(){
        return new Promise((resolve, reject) => {
            productService.list().then(products =>{
                resolve(products);
            }).catch(error=>{
                reject(error)
            })
        })
    }
    create(data){
        return new Promise(async(resolve, reject) => {
            try {                
                let products = await this.list();
                if(products.length){
                    let product = products.find(prod => prod.productId == data.productId);
                    if(product){
                        reject("Product ID is already Exist")
                        return;
                    }
                }
                products.push(data);
                productService.create(products,data).then(res =>{
                    resolve(res);
                }).catch(error=>{
                    reject(error)
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}