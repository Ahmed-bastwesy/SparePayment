let express = require('express');
let router = express.Router();
let validateUser = require('../middlewares/userValidation')
let userController = new (require('../controllers/userController'))()
const AppError = require('../utils/appError');

router.get('/login',validateUser,(req,res,next)=>{
        let {email, password} = req.body;
        userController.login(email, password).then(token => {
               return res.status(200).json({ message:"User Login successfull" , token:token })
        }).catch(error => {
                next(new AppError(error, 400));
        });
})

module.exports = router;