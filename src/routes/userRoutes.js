let express = require('express');
let router = express.Router();
let validateUser = require('../middlewares/userValidation')
let userController = new (require('../controllers/userController'))()

router.get('/login',validateUser,(req,res)=>{
        let {email, password} = req.body;
        userController.login(email, password).then(token => {
               return res.status(200).json({ message:"User Login successfull" , token:token })
        }).catch(error => {
                return res.status(400).json({ error: error.message });
        });
})

module.exports = router;