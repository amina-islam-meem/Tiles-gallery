import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
  baseURL: process.env.N_BETTER_AUTH_URL,
});

export const { signIn, signUp, useSession } = authClient;