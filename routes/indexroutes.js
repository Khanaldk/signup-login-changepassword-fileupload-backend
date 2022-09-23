const express=require('express');
const userroutes=require('../routes/userroutes')
const fileuploadroutes=require('../routes/fileuploadroutes')

const routes=express.Router();

routes.use('/user',userroutes)
routes.use('/fileupload',fileuploadroutes)

module.exports=routes
