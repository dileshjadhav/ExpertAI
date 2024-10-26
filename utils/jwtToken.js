export const generateToken = (user,message,res)=>{
    const token = user.generateJsonWebToken();
    const cookieName = user.role === 'Admin' ? 'adminToken' : 'userToken';
    res.status(400).cookie(cookieName,token,{                     
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES *24 * 60* 60 * 1000), //hours * minuite* second* milisecond 
        httpOnly:true,
    }).json({success:true,message,user,token});
};