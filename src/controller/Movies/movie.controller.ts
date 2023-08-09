import { Request, Response } from "express";

import prisma from "../../db/clientPrisma";
import { uploadImage } from "../../utils/cloudinary";
import fs from 'fs-extra'






export const newMovie = async (req: Request, res: Response): Promise<Response> => {
    const { title,  genres,score , year } = req.body;
    const { userId } = req.params;

    // let {year} = req.body;
    // if(typeof year === 'string'){
    //     year = parseInt(year)
    // }

    // let {score} = req.body;
    // if( typeof score === 'string'){
    //     score = parseInt(score)
    // }
     

   
        console.log(req.files?.poster_image)
    try {
        const newMovie = await prisma.movies.create({
            data: {
                title,
                year,
                genres: {
                    connect:genres.map((genre:string) => ({id:genre}))
                },
                score,
                User: {
                    connect: {
                        id: userId
                    }
                },
                
            },
            include: {
                genres: {
                    select:{name:true}
                },
            }
        });
        
        // const image = req.files?.poster_image
        // if(image){
        //     if("tempFilePath" in image){
        //             await uploadImage(image.tempFilePath)
        //             await fs.unlink(image.tempFilePath)
        //         }
        //     }
          return res.status(201).send(newMovie);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);

    }
};


export const getAllMovies = async (req:Request, res:Response):Promise<Response>=> {
    try {
        const allMovies = await prisma.movies.findMany({
            include: {
                genres: true,
                User: true
            }
        })
        return res.status(200).json(allMovies);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const getMovieById = async (req:Request, res:Response):Promise<Response> => {
    const {movieId} = req.params;
    try {
        const genreMovie = await prisma.movies.findUnique({
            where:{
                id:movieId
            },
            include:{
                genres:true
            }
        })
        return res.status(201).json(genreMovie);
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const updateMovie = async (req:Request, res:Response):Promise<Response> => {
    const {movieId} = req.params;
    const { title } = req.body;

    try {
        const updatedMovie = await prisma.movies.findUnique({
            where:{
                id:movieId
            }
        })
        return res.status(200).send(updatedMovie);
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const deleteMovieById = async (req:Request, res:Response):Promise<Response> =>{
    const {movieId} = req.params;
   
    try {
        await prisma.movies.delete({where: {
            id:movieId
        }})
        return res.status(200).send({msg:"Movie deleted", data: movieId})
    } catch (error) {
        return res.status(500).send(error)
    }

}

