// -------------------------------------------------------------
// - Robert Bettinelli - MDEV1004 - S2023 - Assignment#1
// - 090003683@student.georgianc.on.ca
// -------------------------------------------------------------
// (Models) movie.ts - As Provided in Class Instruction
// Personally entered and followed as pert of in class learning.
// -------------------------------------------------------------
// 06/10/2023 - RBettinelli - Header and Documentation Added
// -------------------------------------------------------------

import { Schema, model } from "mongoose";

// Movie interface for Collecting data in specific types. 
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

// Mongo DB schema Setup
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

// Build Model Object as Interface utilizing Schema. 
let Movie = model<IMovie>('movies', movieSchema);

export default Movie;
