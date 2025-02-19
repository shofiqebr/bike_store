import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT, 
  database_url: process.env.DATABASE_URL as string, 
  bcrypt_salt_rounds: parseInt(process.env.BCRYPT_SALT_ROUND as string, 10), 
  jwt: {
    access_secret: process.env.JWT_ACCESS_SECRET as string, 
    refresh_secret: process.env.JWT_REFRESH_SECRET as string, 
    access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || "7d", 
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN as string,
  },
};