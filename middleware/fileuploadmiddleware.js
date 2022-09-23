const multer=require('multer');
const path=require('path');
const imagefilter=(req,file,cb)=>
{
    if(file.originalname.toLowerCase().match(/\.(jpeg|jpg|png|gif|svg)$/))
    {
        cb(null,true)
    }else{
        cb(new Error('You can upload only image files!!'),false);

    }
}

//destination and filename
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'C:/Users/bhair/OneDrive/Desktop/upload')
    },
    filename:(req,file,cb)=>
    {
        cb(null,file.originalname)
    }
});

const fileupload={}

fileupload.imageupload=multer({
    fileFilter:imagefilter,
    storage,
    limits:{
        fileSize:1024*1024*1024
    }
})

const docfilter=(req,file,cb)=>
{
    if(file.originalname.toLowerCase().match(/\.(pdf|doc|docx|pptx)$/))
    {
        cb(null,true)
    }else{
        cb(new Error('You can upload only doc file!!'),false)
    }
}

fileupload.docupload=multer({
    fileFilter:docfilter,
    storage,
    limits:{
        fileSize:1024*1024*1024
    }
})

module.exports=fileupload



