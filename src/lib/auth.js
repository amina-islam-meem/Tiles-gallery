import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("tiles-gallery");

export const auth = betterAuth({

    baseURL: "https://tiles-gallery-silk.vercel.app/",
    secret: process.env.BETTER_AUTH_SECRET, 
  database: mongodbAdapter(db, {
    client
  }),
  emailAndPassword: { 
    enabled: true
  }
});