let express = require('express');
let router = express.Router();
let validateProduct = require('../middlewares/productValidation')
let productController = new (require('../controllers/productController'))()
const AppError = require('../utils/appError');

router.get('/',(req,res,next)=>{
    productController.list().then(products => {
               return res.status(200).json({ message:"Products List" , products })
        }).catch(error => {
                next(new AppError(error, 400));
        });
})
router.post('/',validateProduct,(req,res,next)=>{
    productController.create(req.body).then(product => {
               return res.status(200).json({ message:"Product created successfull" , product })
        }).catch(error => {
                next(new AppError(error, 400));
        });
})
router.put('/',validateProduct,(req,res,next)=>{
    productController.update(req.body).then(product => {
               return res.status(200).json({ message:"Product updated successfull" , product })
        }).catch(error => {
                next(new AppError(error, 400));
        });
})
router.delete('/:id',(req,res,next)=>{
    productController.delete(req.params.id).then(id => {
               return res.status(200).json({ message:`Product id ${id} deleted successfull`})
        }).catch(error => {
                next(new AppError(error, 400));
        });
})

module.exports = router;