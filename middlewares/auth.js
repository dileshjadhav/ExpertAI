import jwt from "jsonwebtoken";



export const isadminAuthenticated = async(req,res,next)=>{
    const token = req.cookies.adminToken;
    if(!token){
        return res.status(400).json({success:false,message:"admin not Authenticated!"});
    }

    const decoded = jwt.verify(token,process.env.JWT_API_SECRET);
    req.user = await User.findById(decoded.id);
    if(req.user.role !== "Admin"){
        return next(
            res.status(403).json({success:false,message:`${req.user.role}`})
        )
    }
    next();
}


export const isuserAuthenticated = async(req,res,next)=>{
    const token = req.cookies.userToken;
    if(!token){
        return res.status(400).json({success:false,message:"user not Authenticated!"});
    }

    const decoded = jwt.verify(token,process.env.JWT_API_SECRET);
    req.user = await User.findById(decoded.id);
    if(req.user.role !== "user"){
        return next(
            res.status(403).json({success:false,message:`${req.user.role}`})
        )
    }
    next();
};