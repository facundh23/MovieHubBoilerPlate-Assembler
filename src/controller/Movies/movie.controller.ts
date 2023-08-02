import { Request, Response } from "express";
import User from "../../models/user/user";
import Movies from "../../models/movie/movie";

export const createMovie =async (req:Request, res:Response):Promise<Response>=> {
    const { name, poster_image, score } = req.body;
    const {userId} = req.params;

    
    try {
        const newMovie = Movies.create({
            name, poster_image, score
        })

        await User.findByIdAndUpdate({_id: userId}, {
            $push: {movies: (await newMovie)._id}
        },)
        return res.status(201).send(newMovie)
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const deleteMovieById = async (req:Request, res:Response):Promise<Response> =>{
    const {Id} = req.params;
    try {
        return res.status(200).send({msg:"Movie deleted", data: Id})
    } catch (error) {
        return res.status(500).send(error)
    }
}