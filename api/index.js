import app from "../app.js";
import config from "../src/config/config.js";
import { connectMongo } from "../src/databases/mongo.cnx.js";

let isConnected = false;

export default async function handler(req, res) {
    if (config.chatStorage === "mongo" && !isConnected) {
        try {
            await connectMongo();
            isConnected = true;
            console.log("Connected to MongoDB");
        } catch (error) {
            console.error("Failed to connect to MongoDB:", error);
        }
    }
    return app(req, res);
}
