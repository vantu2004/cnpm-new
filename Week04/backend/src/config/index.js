import "dotenv/config";

export const port = process.env.PORT || 8080;
export const mongoUri = process.env.MONGODB_URI;
export const jwtSecret = process.env.JWT_SECRET || "change_me";

export default { port, mongoUri, jwtSecret };
