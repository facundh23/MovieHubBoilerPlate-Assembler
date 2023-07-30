import {Response, Request} from 'express';
import User from '../../models/user/user';

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


export const signUp = async(req:Request, res:Response):Promise<Response> => {

    
    if(!req.body.email || !req.body.password){
        return res.status(400).json({msg:"Please, check your email and password"})
    }

    const user = await User.findOne({email:req.body.email})
    console.log(user);
    if(user){
        return res.status(400).json({
            msg:"The user already exists"
        })
    }

    const newUser = new User(req.body);
    await newUser.save();
    return res.status(201).json(newUser);
}

export const signIn = (req:Request, res:Response) => {
    res.send('Sign In')
}