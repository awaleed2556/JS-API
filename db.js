// connecting database
import { neon } from '@neondatabase/serverless';
export const sql = neon(`postgresql://neondb_owner:npg_5GmiTbOfqk7U@ep-sparkling-brook-a1ee2p7b-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`);
