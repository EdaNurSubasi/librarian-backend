import * as dotenv from 'dotenv';
dotenv.config();
export default {
    port: process.env.SERVER_PORT,
    db_user: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    db: process.env.DB,
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
};
//# sourceMappingURL=config.js.map