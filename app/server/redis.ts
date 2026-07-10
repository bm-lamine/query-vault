import { Redis } from "ioredis"
import { serverEnv } from "~/utils/env.server"

export const redis = new Redis(serverEnv.REDIS_URL)
