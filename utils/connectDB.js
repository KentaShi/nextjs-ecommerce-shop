import mongoose from "mongoose";

const connectDB = () => {
    if (mongoose.connections[0].readyState) {
        console.log("Mongoose Already Connected.");
        return;
    }
    mongoose.connect(
        process.env.MONGODB_URL,
        {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        (error) => {
            if (error) {
                throw new Error(error);
            }
            console.log("Connected to MongoDB...");
        }
    );
};

export default connectDB;
