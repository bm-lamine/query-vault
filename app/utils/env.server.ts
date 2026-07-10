import { createEnv } from "@t3-oss/env-core"
import * as v from "valibot"

export const serverEnv = createEnv({
  server: {
    DATABASE_URL: v.pipe(v.string(), v.url()),
    REDIS_URL: v.pipe(v.string(), v.url()),

    BETTER_AUTH_SECRET: v.pipe(v.string(), v.trim()),
    BETTER_AUTH_URL: v.pipe(v.string(), v.url()),

    GOOGLE_CLIENT_ID: v.pipe(v.string(), v.trim()),
    GOOGLE_CLIENT_SECRET: v.pipe(v.string(), v.trim()),

    GITHUB_CLIENT_ID: v.pipe(v.string(), v.trim()),
    GITHUB_CLIENT_SECRET: v.pipe(v.string(), v.trim()),

    NODE_ENV: v.fallback(
      v.picklist(["development", "test", "production"]),
      "development"
    ),
  },
  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: process.env,

  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true,
})
