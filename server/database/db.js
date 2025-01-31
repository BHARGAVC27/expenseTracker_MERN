const mongoose = require('mongoose');
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected");
        console.log(`Server running on ${mongoose.connection.host}`);
    } catch(error){
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;

