import {Response, Request} from 'express';
import User from '../../models/user/user';

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

export const getAllUsers = async (req:Request, res:Response):Promise<Response>=> {
    try {
        const allUsers = await User.find()
        return res.status(200).json(allUsers);
    } catch (error) {
        return res.status(500).json(error);
    }
}
export const getUserById = async (req:Request, res:Response):Promise<Response> => {
    const {userId} = req.params;
    try {
        const user = await User.findById({_id: userId}).populate('movies');
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const updateUser = async (req:Request, res:Response):Promise<Response> => {
    const {userId} = req.params;
    const { name, email } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate({_id:userId}, {$ser:{name:name, email:email}}, {new:true})
        return res.status(200).send(updatedUser);
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const deleteUser = async (req:Request, res:Response):Promise<Response> => {
    const {userId} = req.params;
    try {
        await User.findByIdAndDelete({_id:userId})
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json(error)
    }
    res.status(200).send("User Deleted ok");
}



export const signIn = (req:Request, res:Response) => {
    res.send('Sign In')
}