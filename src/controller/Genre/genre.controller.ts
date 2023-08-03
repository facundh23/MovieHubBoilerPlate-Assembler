import { Request, Response } from "express";
import User from "../../models/user/user";
import Movies from "../../models/movie/movie";
import Genres from "../../models/genre/genre";

export const addGenre = async (req:Request, res:Response):Promise<Response>=> {
    const {movieId} = req.params;
    if(!req.body.name){
        return res.status(400).json({msg:"This field is required"})
    }

    const genre = await Genres.findOne({name: req.body.name})
    if(genre){
        return res.status(400).json({
            msg:"The genre already exist"
        })
    }

    try {
        const newGenre = new Genres(req.body)

        await Movies.findByIdAndUpdate({_id: movieId}, {
            $push: {genres: ( newGenre)._id}
        },)
        await newGenre.save();

        return res.status(201).send(newGenre)
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const showGenres = async(req:Request, res: Response):Promise<Response> => {
    try {
        const allGenres = await Genres.find()
        return res.status(200).json(allGenres);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const deleteGenreById = async (req:Request, res:Response):Promise<Response> =>{
    const {genreId} = req.params;
    
    try {
        await Genres.findByIdAndDelete(({_id:genreId}))
        return res.status(200).send({msg:"Genre deleted", data: genreId})
    } catch (error) {
        return res.status(500).send(error)
    }
}