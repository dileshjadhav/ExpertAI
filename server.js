import app from "./app.js";
import cloudinary from "cloudinary"


cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    cloudinary_api:process.env.CLOUDINARY_API_SECRET,
    cloudinary_secret:process.env.CLOUDINARY_SECRET_KEY

})

app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`);
});
   