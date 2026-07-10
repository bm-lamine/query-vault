import { index, pgTableCreator } from "drizzle-orm/pg-core"

const createTable = pgTableCreator((n) => `vault_${n}`)

export const users = createTable("users", (t) => ({
  id: t.text("id").primaryKey(),
  name: t.text("name").notNull(),
  email: t.text("email").notNull().unique(),
  emailVerified: t.boolean("email_verified").default(false).notNull(),
  image: t.text("image"),
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
  updatedAt: t
    .timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
}))

export const accounts = createTable(
  "accounts",
  (t) => ({
    id: t.text("id").primaryKey(),
    accountId: t.text("account_id").notNull(),
    providerId: t.text("provider_id").notNull(),
    userId: t
      .text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accessToken: t.text("access_token"),
    refreshToken: t.text("refresh_token"),
    idToken: t.text("id_token"),
    accessTokenExpiresAt: t.timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: t.timestamp("refresh_token_expires_at"),
    scope: t.text("scope"),
    password: t.text("password"),
    createdAt: t.timestamp("created_at").defaultNow().notNull(),
    updatedAt: t
      .timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  }),
  (table) => [index("accounts_userId_idx").on(table.userId)]
)
