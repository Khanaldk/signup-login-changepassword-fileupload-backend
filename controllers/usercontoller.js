const models=require('../models');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


class usercontroller
{
    //for signup
    static signup=async(req,res)=>
    {
        let {name,email,password}=req.body;
         const findemail =await models.user.findOne({where:{email:email}});
         if(findemail)
         {
            res.status(200).json({
                message:"Email already exist.."
            })
         }else{

                if(name && email && password)
                {
                    const salt=await bcrypt.genSalt(10);
                    const hashpassword=await bcrypt.hash(password,salt);

                    const database=
                    {
                        name:name,
                        email:email,
                        password:hashpassword
                    }



                 const newdatabase= await models.user.create(database)
                if(newdatabase)
                {
                    res.status(200).json({
                        message:"User created successfully..",
                        result:newdatabase
                    })
                }else{
                    res.status(500).json({
                        message:"Something went wrong.."
                    })
                }

                }else{
                    res.status(502).json({

                        message:"All fields are required.."
                    })
                }
             }
         
    }

    static login=async(req,res)=>
    {
        const {email,password}=req.body;
        
        if(email && password)
        {
            
            const userone=await models.user.findOne({where:{email:email}})
        
            if(userone==null)
            {
                res.status(500).json({
                    message:"You arenot a registered user..."
                })
            }
            // const salt= await bcrypt.genSalt(10);
            // const hash=await bcrypt.hash(password,salt)
            const checkpassword=await bcrypt.compare(password,userone.password)
            {
                if((userone.email==email) && checkpassword)
                {
                    const token= await jwt.sign({userid:userone.id},process.env.JWT_SECRET_TOKEN,{expiresIn:"5d"})

                    res.status(200).json({
                        message:"User login Successfully..",
                        token:token
                    })
                }else{
                    res.status(502).json({
                        message:"Email or password is invalid!!"
                    })
                }
            }
        }else{
            res.status(502).json({
                message:"All fields are required.."
            })
        }
            
    }

    static changepassword=async(req,res)=>
    {
        const {email,oldpassword,newpassword}=req.body;

        if(email && oldpassword && newpassword)
        {
            const userone=await models.user.findOne({where:{email:email}})
            if(userone==null)
            {
                res.status(501).json({
                    message:"You arenot a registered user.."
                })
            }else{
                
                const checkpassword=await bcrypt.compare(oldpassword,userone.password)
                if(checkpassword)
                {
                    const salt=await bcrypt.genSalt(10);
                    const  hashpassword=await bcrypt.hash(newpassword,salt);
                    

                    const result=await models.user.update({password:hashpassword},{where:{email:email}})
                    if(result)
                    {
                        res.status(200).json({
                            message:"Password changed Successfully!!",
                            updated:result
                        })
                    }else{
                        res.status(501).json({
                            message:"Something went wrong.."
                        })
                    }

                }else{
                    res.status(500).json({
                        message:"Incorrect password !!"
                    })
                }
            }
        }else{
            res.status(500).json({
                message:"All fields are required.."
            })
        }
    }

}


module.exports= usercontroller
