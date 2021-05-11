const dotenv = require('dotenv');

dotenv.config();
module.exports = {
    // PORT: process.env.PORT || 8000,
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/ecommerce',
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
    accessKeyId: process.env.accessKeyId || 'accessKeyId',
    secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
}