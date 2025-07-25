const mongoose = require("mongoose");

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI,{});
        console.log("DB Connected");
    }
    catch(err){
        console.error("Error:",err);
        process.exit(1);
    }
};

module.exports = connectDB;