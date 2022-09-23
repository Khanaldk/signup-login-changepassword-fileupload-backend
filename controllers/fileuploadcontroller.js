const models=require('../models');
const path=require('path');

class Fileupload
{
    static singlefileupload=async(req,res)=>
    {
        if(!req.file){
            return res.status(501).json({
                message:"Please first choose the document file to upload!!"
            })
        }

        const filedata=
        {
            filename:req.file.filename,
            filesize:req.file.size,
            mimetype:req.file.mimetype,
            extension:path.extname(req.file.originalname)
        }
        if(filedata){
            if(filedata.filesize>(1024*1024*1024))
        {
           res.send({
            message:"File is too large!!"
           })
        }
        }
        
            
            const newfile=await models.Fileupload.create(filedata);
        if(newfile){
            res.status(200).json({
                message:"Successfully image uploaded!!",
                result:newfile
            })
        }else{
            res.status(501).json({
                message:"Something went wrong!!"
            })
         } 
    }

    static singledocupload=async(req,res)=>
    {
        if(!req.file)
        {
            res.status(500).json({
                message:"Please first choose the document file!!"
            })
        }

        const filedata=
        {
            filename:req.file.filename,
            filesize:req.file.size,
            mimetype:req.file.mimetype,
            extension:path.extname(req.file.originalname)
        }

        const newfile= await models.Fileupload.create(filedata);
        if(newfile){
            res.status(201).json({
                message:"Successfully upload the doc file!!",
                result:newfile
            })
        }else{
            res.status(500).json({
                message:"Something went wrong!!"
            })
        }
    }

    
    static multiplefileupload=async(req,res)=>
    {
        const filearray=[];
        await Promise.all(
            req.files.map(async(file)=>
            {
                const filedata=
                {
                    filename:file.filename,
                    filesize:file.size,
                    mimetype:file.mimetype,
                    extension:path.extname(file.originalname)

                }
                const newfile=await models.Fileupload.create(filedata);
                filearray.push(newfile);
            })
        )

            res.status(200).json({
                message:"Successfully uploaded multiple file!!",
                result:filearray
            })
    }
}

module.exports=Fileupload
