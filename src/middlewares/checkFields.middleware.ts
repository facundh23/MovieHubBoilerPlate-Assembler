import { NextFunction, Request, Response } from "express";

export const checkFieldsMovie = (req:Request, res: Response, next:NextFunction):void=>  {
    const {title} = req.body;

    if(title.length < 4){
        res.status(400).send({msg: 'Name must be at least 4 characters long'})
        return
    }
    
    next()
}

export const checkFieldsUser = (req:Request, res: Response, next:NextFunction):void=>  {
    const {name} = req.body;

    if(name.length < 4){
        res.status(400).send({msg: 'Name must be at least 4 characters long'})
        return
    }
    
    next()
}

