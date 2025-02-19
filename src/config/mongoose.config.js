import mongoose from "mongoose";

export default async () => {
    try {
        // Below method is depricated in node 4 and above
        // await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        await mongoose.connect(process.env.DB_URL,{
            dbName: process.env.DB_NAME,
        });
        console.log("Connected to MongoDB via mongoose");
    } catch (error) {
        console.log("Failed to connect to MongoDB via mongoose", error);
    }
}