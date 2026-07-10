import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import { serverEnv } from "~/utils/env.server"
import * as schema from "./schema"

const globalForDb = globalThis as unknown as {
  conn?: postgres.Sql
}

const conn = globalForDb.conn ?? postgres(serverEnv.DATABASE_URL)
if (serverEnv.NODE_ENV !== "production") globalForDb.conn = conn

const db = drizzle(conn, { schema })
export { db, schema }
