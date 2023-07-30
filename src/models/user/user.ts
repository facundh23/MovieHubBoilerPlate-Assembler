import {model, Schema, Document} from "mongoose";
import bcrypt from 'bcrypt';

export interface UserInterface extends Document{
    id:string,
    name:string,
    email:string,
    password:string,
    movies: object[]
}

const userSchema = new Schema({
    id:{
        type: String, 
        unique:true
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    movies:[],
})

userSchema.pre<UserInterface>('save', async function(next) {
        const user = this;

        if(!user.isModified('password')) return next();

        const salt = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(user.password, salt)

        user.password = hash;
        next();
});

userSchema.methods.comparePassword = async function(password:string):Promise<boolean>{
    return await bcrypt.compare(password, this.password)
}

export default model<UserInterface>('User', userSchema);