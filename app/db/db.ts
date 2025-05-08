import {drizzle} from "drizzle-orm/node-postgres";
import { Pool} from "pg";

import * as schema from "./schema";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || "postgresql://mystudysync_owner:npg_iKNWJ0cOk3Md@ep-flat-sun-a10wmuo6-pooler.ap-southeast-1.aws.neon.tech/mystudysync?sslmode=require"
})

export const db = drizzle(pool, {schema});