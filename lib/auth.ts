import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { admin } from "better-auth/plugins";

const uri = process.env.MONGODB_URI || process.env.MONGODB_URL;

if (!uri) {
  throw new Error("Please add your Mongo URI to env (MONGODB_URI or MONGODB_URL)");
}

const options = {
  tls: true,
  serverSelectionTimeoutMS: 30000, // 30s instead of 5s
  // DigitalOcean has valid certs, so this is usually not needed:
  // tlsAllowInvalidCertificates: true,
};

declare global {

  var _mongoClient: MongoClient | undefined;
}

// Reuse a single MongoClient in serverless (Vercel)
const client =
  global._mongoClient ?? new MongoClient(uri, options);

if (!global._mongoClient) {
  global._mongoClient = client;
}

// Your data is in the "test" database (per earlier steps)
const db = client.db("test");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client, // optional but recommended
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "student",
      },
      phone: {
        type: "string",
        required: false,
      },
    },
  },
  plugins: [
    admin()
  ],
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
});
