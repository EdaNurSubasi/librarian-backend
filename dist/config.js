import * as dotenv from 'dotenv';
dotenv.config();
export default {
    port: process.env.SERVER_PORT,
    db_user: process.env.DB_USERNAME,
    db_psw: process.env.DB_PASSWORD,
};
//# sourceMappingURL=config.js.map