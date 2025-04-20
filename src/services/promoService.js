const { readJSON, writeJSON } = require('../utils/fileHelper');

module.exports = class PromoService {
    list(){
        return new Promise(async(resolve, reject) => {  
            try {                
                const promos = await readJSON('promo.json');
                resolve(promos.length ? promos : []);
            } catch (error) {
                reject(error.message)
            }          
        })
    }
    update(promos,data){
        return new Promise(async(resolve, reject) => {  
            try {                
                await writeJSON('promo.json',promos);
                resolve(data);
            } catch (error) {
                reject(error.message)
            }          
        })
    }
}