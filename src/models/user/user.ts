import {model, Schema, Document} from "mongoose";
import bcrypt from 'bcrypt';

export interface UserInterface extends Document{
    id:string,
    name:string,
    email:string,
    password:string,
    createdAt: Date,
    updatedAt: Date,
    movies: string[]
}

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:[true, 'This field is Required ❌'],
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true, 'This field is Required ❌'],
    },
    movies:{
        type: [{type: Schema.Types.ObjectId, ref: 'Movies'}]
    },
}, {
    timestamps: true,
    versionKey: false
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