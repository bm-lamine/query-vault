import { redisStorage } from "@better-auth/redis-storage"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { magicLink } from "better-auth/plugins"
import clipboardy from "clipboardy"

import { db } from "~/server/db"
import { redis } from "~/server/redis"
import { serverEnv } from "~/utils/env.server"

export const auth = betterAuth({
  secret: serverEnv.BETTER_AUTH_SECRET,
  baseURL: serverEnv.BETTER_AUTH_URL,

  database: drizzleAdapter(db, {
    provider: "pg",
    transaction: true,
    usePlural: true,
  }),

  secondaryStorage: redisStorage({
    client: redis,
    keyPrefix: "auth:",
  }),

  socialProviders: {
    google: {
      clientId: serverEnv.GOOGLE_CLIENT_ID,
      clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: serverEnv.GITHUB_CLIENT_ID,
      clientSecret: serverEnv.GITHUB_CLIENT_SECRET,
    },
  },

  plugins: [
    magicLink({
      sendMagicLink: async ({ url }) => {
        console.log("url copied to your clipboard")
        await clipboardy.write(url)
      },
    }),
  ],
})
