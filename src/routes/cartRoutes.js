let express = require('express');
let router = express.Router();
let checkAuth = require('../middlewares/checkAuth')
let validateCart = require('../middlewares/cartValidation')
let cartController = new (require('../controllers/cartController'))()
const AppError = require('../utils/appError');

router.get('/',checkAuth,(req,res,next)=>{
    cartController.getUserCart(req.user).then(cart => {
               return res.status(200).json({ message:"Products List" , ...cart })
        }).catch(error => {
                next(new AppError(error, 400));
        });
})
router.put('/removeProduct/:id',checkAuth,(req,res,next)=>{
        cartController.removeProduct(req.user,req.params.id).then(cart => {
                   return res.status(200).json({ message:"Products List" , ...cart })
            }).catch(error => {
                    next(new AppError(error, 400));
            });
    })

module.exports = router;