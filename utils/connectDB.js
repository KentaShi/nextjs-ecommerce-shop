import mongoose from "mongoose";
const MONGODB_URL = process.env.MONGODB_URL;

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        console.log("Mongoose Already Connected.");
        return;
    }
    mongoose
        .connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Mongoose Connected");
        })
        .catch((error) => {
            console.log("Mongoose Error: " + error);
        });
};

export default connectDB;
