import { Request, Response } from "express";
import User from "../../models/user/user";
import Movies from "../../models/movie/movie";
import { uploadImage } from "../../utils/cloudinary";
import fs from 'fs-extra';




export const createMovie = async (req:Request, res:Response):Promise<Response>=> {
    
    
    try {
        const { name, poster_image, score, genres , year} = req.body;

       
        const {userId} = req.params;

        const newMovie = new Movies({
            name, score, genres, year
        })

        const image = req.files?.poster_image

        if(image){
            if("tempFilePath" in image){
               const result = await uploadImage(image.tempFilePath)
               newMovie.poster_image = {
                public_id: result.public_id,
                secure_url: result.secure_url
               }
               await fs.unlink(image.tempFilePath)
            }
        }

       
        

        await User.findByIdAndUpdate({_id: userId}, {
            $push: {movies: (await newMovie)._id}
        },)

        await newMovie.save();
       
        return res.status(201).json(newMovie)
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const getAllMovies = async (req:Request, res:Response):Promise<Response>=> {
    try {
        const allMovies = await Movies.find()
        return res.status(200).json(allMovies);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const getMovieById = async (req:Request, res:Response):Promise<Response> => {
    const {movieId} = req.params;
    try {
        const genreMovie = await Movies.findById({_id: movieId}).populate('genres').populate({path: 'genres.genre', model:'Genres'});
        return res.status(201).json(genreMovie);
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const updateMovie = async (req:Request, res:Response):Promise<Response> => {
    const {movieId} = req.params;
    const { name, poster_image, year, score, genres } = req.body;

    try {
        const updatedMovie = await Movies.findByIdAndUpdate({_id:movieId}, {$set :{name:name, poster_image:poster_image, score:score, year:year, genres:genres}}, {new:true})
        return res.status(200).send(updatedMovie);
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const deleteMovieById = async (req:Request, res:Response):Promise<Response> =>{
    const {movieId} = req.params;
   
    try {
        await Movies.findByIdAndDelete({_id: movieId})
        return res.status(200).send({msg:"Movie deleted", data: movieId})
    } catch (error) {
        return res.status(500).send(error)
    }
    res.status(200).send("Movie Deleted ok");
}

