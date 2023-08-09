import { Response, Request } from 'express';
import prisma from '../../db/clientPrisma';
import { encryptPassword } from '../../utils/bcrypt';
import bcrypt from 'bcrypt';


export const signUp = async (req: Request, res: Response): Promise<void> => {

    const { name, email, password } = req.body;

    try {

        if (!name || !email || !password) {
            res.status(400).json({error: "Missing required fields"});
            return;
        }
        
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: await encryptPassword(password)
            }
        })

        

        res.status(200).json(newUser);

    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const allUsers = await prisma.user.findMany({
            include:{
                movies:{
                    select:{
                        title:true
                    }
                }
            }
        })
        return res.status(200).json(allUsers);
    } catch (error) {
        return res.status(500).json(error);
    }
}
export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                movies:{
                   include:{
                        genres:{
                            select:{name:true}
                        },
                }
                }
            },
        })
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.params;
    const { name, email } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where:{
                id: userId
            },
            data: {
                name, email
            }
        })
        return res.status(200).send(updatedUser);
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.params;
    try {

        await prisma.user.delete({
            where:{
                id:userId 
            }
        })
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json(error)
    }
    
}



export const signIn = (req: Request, res: Response) => {
    res.send('Sign In')
}