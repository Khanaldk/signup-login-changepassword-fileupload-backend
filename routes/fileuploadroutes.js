const express=require('express');
const fileupload=require('../middleware/fileuploadmiddleware')
const fileuploadcontroller=require('../controllers/fileuploadcontroller');


const fileuploadroutes=express.Router();

/**
 * @swagger
 * tags:
 *     name: FileUpload
 *     description: The image upload API endpoint
*/

/**
 * @swagger
 *  /api/fileupload/image:
 *   post:
 *     summary: Upload a single image
 *     tags: [FileUpload]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            properties:
 *              image:
 *                type: string
 *                format: binary
 *     responses:
 *      200:
 *          description: Image Uploaded successfully
 *      500:
 *          description: Some Server Error
*/

fileuploadroutes.post('/image',(req,res)=>{
    fileupload.imageupload.single('image')(req,res,(err)=>{
     if(err)
     {
        return res.status(401).json({
            message:err.message
        })
     }  
     return fileuploadcontroller.singlefileupload(req,res); 
    })
})


/**
 * @swagger
 *  /api/fileupload/doc:
 *   post:
 *     summary: Upload a single doc
 *     tags: [FileUpload]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            properties:
 *              doc:
 *                type: string
 *                format: binary
 *     responses:
 *      200:
 *          description: Doc Uploaded successfully
 *      500:
 *          description: Some Server Error
*/


fileuploadroutes.post('/doc',(req,res)=>
{
    fileupload.docupload.single('doc')(req,res,(err)=>{
        if(err)
        {
        return res.status(402).json({
            message:err.message
        })
     }
    return fileuploadcontroller.singledocupload(req,res);
    })
})

/**
 * @swagger
 *  /api/fileupload/multiple:
 *   post:
 *     summary: Upload a multiple images
 *     tags: [FileUpload]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            properties:
 *              images:
 *                type: array
 *                items:
 *                  type: string
 *                  format: binary
 *     responses:
 *      200:
 *          description: Images Uploaded Successfully
 *      500:
 *          description: Some Server Error
*/

fileuploadroutes.post('/multiple',fileupload.imageupload.array('images',10),fileuploadcontroller.multiplefileupload)

module.exports=fileuploadroutes