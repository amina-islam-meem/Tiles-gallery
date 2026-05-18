import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";


if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is missing in environment variables");
}

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("tiles-gallery"); 

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(db), 
  emailAndPassword: { 
    enabled: true,
    autoSignIn: true,
  },
  user: {
    changeEmail: { enabled: false },
    additionalFields: {
      image: { type: "string", required: false }
    }
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  trustedOrigins: ["http://localhost:3000", "https://tiles-gallery-silk.vercel.app"],
});