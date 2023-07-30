import {model, Schema, Document} from 'mongoose';

export interface MovieInterface extends Document {
    id:string,
    name:string,
    poster_image: string,
    score:number,
    genre:string[]
}

const movieSchema = new Schema({
    id:{
        type:String,
        unique:true,
    },
    name:{
        type:String,
        unique:true,
    },
    poster_image:{
        type:String, 
        unique:true,
    },
    score:{
        type:Number,
    },
    genre:{
        type:[],
    }
})

export default model<MovieInterface>('Movie', movieSchema);