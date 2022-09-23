const jwt =require('jsonwebtoken');


function checkAuth(req,res)
{
    try {
        const token=req.headers.authorization;

        if(!token)
        {
            res.status(500).json({
                message:"Token Not found..."
            })
        }

        const decodedtoken=token.split(' ')[1];      //Bearer #gffg$YHGFHGH#fg$
        const accessToken=jwt.sign(decodedtoken,process.env.JWT_SECRET_TOKEN);
        if(!accessToken)
        {
            res.status(402).json({
                message:"Failed to authenticate!!"
            })
        }

        req.user=accessToken;
        next();

    } catch (error) {
        res.status(404).json({
            message:"Invalid Operation!! or token expired!!"
        })
    }
}

module.exports=
{
    checkAuth:checkAuth
}