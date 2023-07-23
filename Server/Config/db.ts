// -------------------------------------------------------------
// - Robert Bettinelli - MDEV1004 - S2023 - Assignment#1
// - 090003683@student.georgianc.on.ca
// -------------------------------------------------------------
// (Config) db.ts - As Provided in Class Instruction
// Personally entered and followed as pert of in class learning.
// -------------------------------------------------------------
// 06/10/2023 - RBettinelli - Header and Documentation Added
// 07/22/2023 - RBettinelli - Added Secret & Secure Flag. 
// -------------------------------------------------------------

// Connection Setup for MongoDB Locations.
let localURI = 'mongodb://localhost:27017/movies';
let remoteURI = 'mongodb+srv://robertbettinelli:k9P5Zy44TKJZsGls@cluster0.z16ahlj.mongodb.net/movies';
let secret = "#mySecret2023!";
let secure = false;

export default {
    localURI: localURI,
    remoteURI: remoteURI,
    secret: secret,
    secure: secure
}