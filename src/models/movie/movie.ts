import {model, Schema, Document} from 'mongoose';

export interface MovieInterface extends Document {
   
    name:string,
    poster_image: string,
    score:number,
    genre?:string[]
}

const movieSchema = new Schema({
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
        type:[{type: Schema.Types.ObjectId, ref:'Genres'}],
    }
}, {
    timestamps:true, versionKey:false
})

export default model<MovieInterface>('Movies', movieSchema);