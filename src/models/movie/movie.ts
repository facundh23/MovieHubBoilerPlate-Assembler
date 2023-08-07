
import {model, Schema, Document} from 'mongoose';

export interface MovieInterface extends Document {
    name:string,
    poster_image: any,
    score:number,
    year: number,
    genre?:string[]
}

const movieSchema = new Schema({
    name:{
        type:String,
        unique:true,
    },
    poster_image:{
        public_id: String,
        secure_url:String,
    },
    score:{
        type:Number,
    },
    year:{
        type:Number,
    },
    genre:[
        {
            genre: {
                type:Schema.Types.ObjectId, 
                ref:'Genres'
            }
        }
    ]
}, {
    timestamps:true, versionKey:false
})

export default model<MovieInterface>('Movies', movieSchema);