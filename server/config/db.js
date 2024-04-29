const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        mongoose.set('strictQuery',false);
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
          //empty options
        });
        console.log(`DB Connection Was Successful ON ${conn.connection.host}`);
    }catch(err){
        console.log(err);
    }
}
module.exports = connectDB;
