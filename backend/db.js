const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/inotebook"
const mongoURI = "mongodb+srv://Ak095:Spider36@cluster0.vvxhcxd.mongodb.net/test"
const connectToMongo =  ()=>{
  mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongo Successfully");
    })
}

module.exports = connectToMongo;