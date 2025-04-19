const { readJSON, writeJSON } = require('../utils/fileHelper');

module.exports = class ProductService {
    list(){
        return new Promise(async(resolve, reject) => {  
            try {                
                const products = await readJSON('products.json');
                resolve(products.length ? products : []);
            } catch (error) {
                reject(error.message)
            }          
        })
    }
    create(products,data){
        return new Promise(async(resolve, reject) => {  
            try {                
                await writeJSON('products.json',products);
                resolve(data);
            } catch (error) {
                reject(error.message)
            }          
        })
    }
}