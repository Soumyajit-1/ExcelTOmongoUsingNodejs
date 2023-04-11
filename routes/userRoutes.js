const express = require('express');
const user = express();
const router = express.Router();
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const userController = require('../controllers/user_controller');
const homeController = require('../controllers/home_controller');


user.use(bodyParser.urlencoded({extended:true}));
user.use(express.static(path.resolve(__dirname,'public')));

let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads')
    },
    filename:(req,file,cb) =>{
        cb(null,file.originalname)
    }
})

let upload = multer({storage:storage});

user.get('/',homeController.home);
user.post('/importFile',upload.single('file'),userController.importFile);

module.exports=user;