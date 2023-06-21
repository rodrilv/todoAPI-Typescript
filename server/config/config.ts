import { config } from "dotenv";

config();

process.env.DEV_DB = process.env.DEV_DB;
process.env.PORT = process.env.PORT;
process.env.NODE_ENV = process.env.NODE_ENV;

