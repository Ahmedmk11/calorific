export default () => ({
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    gmailPassword: process.env.GMAIL_PASSWORD,
    port: parseInt(process.env.PORT, 10) || 8080,
})
