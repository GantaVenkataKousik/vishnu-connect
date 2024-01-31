import mongoose from "mongoose";
const uri = "mongodb+srv://vkakhil:vishnucnt@cluster0.kslyn8z.mongodb.net/vishnuCnt";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri);
        console.log(`Connected to MongoDB Successfully ${conn.connection.host} `.bgGreen.white);
    }
    catch (err) {
        console.log(`Error connecting to MongoDB`.bgWhite.red);
    }
}

export default connectDB;
