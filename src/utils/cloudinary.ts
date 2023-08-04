import {v2 as cloudinary} from 'cloudinary';


// Configurar cloudinary con mi cuenta 
cloudinary.config({
    secure:true,
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_KEY_SECRET
});

export async function uploadImage (imagePath: string){
    return await cloudinary.uploader.upload(imagePath, {
        folder:'movieImage',
      
    })
   
}