
var mongoose = require('mongoose');

// Connection options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  };

const connectDB = async ()=>{
    console.log('connecting');
    await mongoose.connect(process.env.DB_STRING,options)
    .then(()=>console.log(`Server has been conneced with MongoDB database at ${process.env.DB_STRING}`))
    .catch(e => console.log("An error has occurred while connecting with MongoDB database...", e));
}

const disconnectDB = async ()=>{
    await mongoose.disconnect().then(()=>{
        console.log(`Server has been disconneced with MongoDB database at ${process.env.DB_STRING}`);
    })
    .catch(e => console.log("An error has occurred while disconnecting with MongoDB database...", e));
}

module.exports = {
    connectDB:connectDB,
    disconnectDB:disconnectDB
}

// End of file