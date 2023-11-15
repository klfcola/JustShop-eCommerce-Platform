import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(
            `MongoDB connected: ${connect.connection.host}`.green.inverse
        );
    } catch (error) {
        console.log(`Error: ${error.message}`.red.inverse);
        process.exit(1);
    }
};

export default connectDB;
