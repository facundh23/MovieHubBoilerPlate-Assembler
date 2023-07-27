import {Response, Request} from 'express';

export const getAllUsers = (req:Request, res:Response) => {
    console.log(req.params);
    console.log(req.body);
    res.status(200).send("Get All users ok");
}
export const getUserById = (req:Request, res:Response) => {
    console.log(req.params);
    console.log(req.body);
    res.status(200).send("Get User by Id ok");
}
export const createUser = (req:Request, res:Response) => {
    console.log(req.body);
    res.status(200).send("User Created ok");
}
export const updateUser = (req:Request, res:Response) => {
    console.log(req.body);
    res.status(200).send("User Updated ok");
}
export const deleteUser = (req:Request, res:Response) => {
    console.log(req.params);
    res.status(200).send("User Deleted ok");
}

