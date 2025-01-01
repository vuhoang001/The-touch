import { Sequelize } from 'sequelize'
export const sequelizeConfig = new Sequelize({
    dialect: 'mssql',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 1434,
    username: process.env.DB_USERNAME || 'sa',
    password: process.env.DB_PASSWORD || '1',
    database: process.env.DB_DATABASE || 'microservices',
    dialectOptions: {
        trustServerCertificate: true, // Nếu cần thiết
    },
});


