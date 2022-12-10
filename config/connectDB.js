const mongoose = require ('mongoose');
mongoose.set('strictQuery', false);

const connectDB= async()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/check')
        console.log("database is connected")
      } catch (error) {
        console.log(error);
      }
}

module.exports = connectDB
