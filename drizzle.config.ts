import type { Config } from "drizzle-kit"
import { serverEnv } from "~/utils/env.server"

export default {
  dialect: "postgresql",
  schema: "app/server/db/schema.ts",
  dbCredentials: { url: serverEnv.DATABASE_URL },
  tablesFilter: ["query-vault_*"],
  out: ".output/drizzle",
} satisfies Config
