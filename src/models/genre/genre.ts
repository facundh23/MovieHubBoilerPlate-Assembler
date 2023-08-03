import {model, Schema, Document} from 'mongoose';

export interface GenreInterface extends Document {
    id:string,
    name:string
}

const genreSchema = new Schema({
    name:{
        type:String,
        maxLength: [10, 'Maximun is Seven']
    }
});

export default model<GenreInterface>('Genres', genreSchema);