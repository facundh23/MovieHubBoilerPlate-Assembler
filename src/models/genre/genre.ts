import {model, Schema, Document} from 'mongoose';

export interface GenreInterface {
    id:string, 
    name:string
}

const genreSchema = new Schema({
    id:{
        type:String,
        unique:true
    },
    name:{
        type:String,
        trim:true,

    }
});

export default model<GenreInterface>('Genre', genreSchema);