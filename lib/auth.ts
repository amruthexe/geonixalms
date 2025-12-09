import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || process.env.MONGODB_URL!;
const options = {
    tls: true,
    serverSelectionTimeoutMS: 5000,
    tlsAllowInvalidCertificates: true, // Fix for SSL handshake errors
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
    var _mongoClientPromise: Promise<MongoClient>;
    var _mongoClient: MongoClient;
}

if (!uri) {
    throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClient) {
        global._mongoClient = new MongoClient(uri, options);
        global._mongoClientPromise = global._mongoClient.connect();
    }
    client = global._mongoClient;
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

if (!client) {
    console.warn("MongoDB client was undefined after initialization logic. NODE_ENV:", process.env.NODE_ENV);
    client = new MongoClient(uri, options);
}

// Ensure client is connected (this runs in background)
if (clientPromise) {
    clientPromise.catch(err => console.error("MongoDB connection error:", err));
}

export const auth = betterAuth({
    database: mongodbAdapter(client.db()),
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "student",
            },
        },
    },
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
});
