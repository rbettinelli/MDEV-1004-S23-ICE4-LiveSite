// -------------------------------------------------------------
// - Robert Bettinelli - MDEV1004 - S2023 - Assignment#1
// - 090003683@student.georgianc.on.ca
// -------------------------------------------------------------
// (Controllers) movie.ts - As Provided in Class Instruction
// Personally entered and followed as pert of in class learning.
// -------------------------------------------------------------
// 06/10/2023 - RBettinelli - Header and Documentation Added
// -------------------------------------------------------------

import { Request, Response, NextFunction } from 'express';
import User from '../Models/user';
import Movie from '../Models/movie';
import passport from 'passport';

// UTILITY
// Takes Array and removes spaces @ Front and End
function SanitizeArray(unsanitizedArray: string[]): string[]
{
    let sanitizedArray: string[] = Array<string>();
    for (const unsanitizedString of unsanitizedArray) 
    {
        sanitizedArray.push(unsanitizedString.trim());
    }
    return sanitizedArray;
}

// API FUNCTIONS

// Pull All Mongo Movies Database Documents and Outputs.
export function DisplayMovieList(req: Request, res: Response, next: NextFunction): void
{
    
    Movie.find({})
    .sort({ movieID: 1 })
    .then(function(data)
    {
        res.status(200).json(data);
    })
    .catch(function(err)
    {
        console.error(err);
    });
}

// Pull All Mongo Movie Titles Database Documents and Outputs.
export function DisplayMovieListTitle(req: Request, res: Response, next: NextFunction): void
{
    Movie.find({}, { movieID: 1, title: 1 })
    .sort({ movieID: 1 })
    .then(function(data)
    {
        res.status(200).json(data);
    })
    .catch(function(err)
    {
        console.error(err);
    });
}

// Find Movie by ID in MongoDB and Outputs.
export function DisplayMovieByID(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;
    Movie.findById({_id: id})
    .then(function(data)
    {
        res.status(200).json(data)
    })
    .catch(function(err)
    {
        console.error(err);
    });
}

// Add Movie to MongoDB and Returns Move output.
export function AddMovie(req: Request, res: Response, next: NextFunction): void
{
    // This section will take in-line Entry and Splits then Sanitizes
    // For unlimited Array of items.
    let genres = SanitizeArray((req.body.genres as string).split(","));
    let directors = SanitizeArray((req.body.directors as string).split(","));
    let writers = SanitizeArray((req.body.writers as string).split(","));
    let actors = SanitizeArray((req.body.actors as string).split(","));

    // Populates movie with data from API. 
    let movie = new Movie({
       movieID: req.body.movieID,
       title: req.body.title,
       studio: req.body.studio,
       genres: genres,
       directors: directors,
       writers: writers,
       actors: actors,
       length: req.body.length,
       year: req.body.year,
       shortDescription: req.body.shortDescription,
       mpaRating: req.body.mpaRating,
       criticsRating: req.body.criticsRating,
       posterLink: req.body.posterLink
    });

    // Post Data.
    Movie.create(movie)
    .then(function()
    {
        res.json(movie);
    })
    .catch(function(err)
    {
        console.error(err);
    });
}

// See ADD functionality Above with the addition it only updated by _id
export function UpdateMovie(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;
    let genres = SanitizeArray((req.body.genres as string).split(","));
    let directors = SanitizeArray((req.body.directors as string).split(","));
    let writers = SanitizeArray((req.body.writers as string).split(","));
    let actors = SanitizeArray((req.body.actors as string).split(","));

    let movieToUpdate = new Movie({
       _id: id,
       movieID: req.body.movieID,
       title: req.body.title,
       studio: req.body.studio,
       genres: genres,
       directors: directors,
       writers: writers,
       actors: actors,
       length: req.body.length,
       year: req.body.year,
       shortDescription: req.body.shortDescription,
       mpaRating: req.body.mpaRating,
       criticsRating: req.body.criticsRating,
       posterLink: req.body.posterLink
    });

    Movie.updateOne({_id: id}, movieToUpdate)
    .then(function()
    {
        res.json(movieToUpdate);
    })
    .catch(function(err)
    {
        console.error(err);
    });
}

// Delete movie based on _id
export function DeleteMovie(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    Movie.deleteOne({_id: id})
    .then(function()
    {
        res.json(id);
    })
    .catch(function(err)
    {
        console.error(err);
    });
}


// AUTHENTICATION

    export function ProcessRegistration(req:Request, res:Response, next:NextFunction): void
    {
        // instantiate a new user object
        let newUser = new User
        ({
            username: req.body.username,
            emailAddress: req.body.EmailAddress,
            displayName: req.body.FirstName + " " + req.body.LastName
        });

        User.register(newUser, req.body.password, (err) =>
        {
            if(err)
            {
                console.error('Error: Inserting New User');
                if(err.name == "UserExistsError")
                {
                    console.error('Error: User Already Exists');
                }
                return res.json({success: false, msg: "User not Registered Successfully!"});
            }
            // if we had a front-end (Angular, React or a Mobile UI)...
            // return res.json({success: true, msg: 'User Registered Successfully!'});
            // automatically login the user
            return passport.authenticate('local')(req, res, ()=>
            {
               return res.json({success: true, msg: 'User Logged in Successfully!', user: newUser});
            });
        });
    }

    export function ProcessLogin(req:Request, res:Response, next:NextFunction): void
    {
        passport.authenticate('local', (err: any, user: any, info: any) => {
        // are there server errors?
        if(err)
        {
            console.error(err);
            return next(err);
        }
        // are the login errors?
        if(!user)
        {
            return res.json({success: false, msg: 'User Not Logged in Successfully!'});
        }
        req.login(user, (err) => 
        {
            // are there DB errors?
            if(err)
            {
                console.error(err);
                return next(err);
            }
            // if we had a front-end (like Angular or React or Mobile UI)...
            return res.json({success: true, msg: 'User Logged in Successfully!', user: user});
        });
    })(req, res, next);
}

export function ProcessLogout(req:Request, res:Response, next:NextFunction): void
{
    req.logout(() => {
        console.log("User Logged Out");
    });
    
    // if we had a front-end (Angular, React or Mobile UI)...
    res.json({success: true, msg: 'User Logged out Successfully!'});
}