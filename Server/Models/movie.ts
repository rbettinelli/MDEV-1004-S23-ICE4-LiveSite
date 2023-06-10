import { Schema, model } from "mongoose";

interface IMovie {
    movieID: number,
    title: string,
    studio: string,
    genres: string[],
    directors: string[],
    writers: string[],
    actors: string[],
    year: number,
    length: string,
    shortDescription: string,
    mpaRating: string,
    criticsRating: number,
    posterLink: string
}

let movieSchema = new Schema<IMovie>({
    movieID: Number,
    title: String,
    studio: String,
    genres: [String],
    directors: [String],
    writers: [String],
    actors: [String],
    year: Number,
    length: String,
    shortDescription: String,
    mpaRating: String,
    criticsRating: Number,
    posterLink: String
});

let Movie = model<IMovie>('movies', movieSchema);

export default Movie;
