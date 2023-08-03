import { NextFunction, Request, Response } from "express";

export const checkFields = (req:Request, res: Response, next:NextFunction):void=>  {
    const {name} = req.body;

    if(name.length < 3){
        res.status(400).send({msg: 'Name must be at least 4 characters long'})
        return
    }
    next()
}