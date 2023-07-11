import app from "./app";
import { dbConnection } from "./database/conection";
import dotenv from "dotenv";

dotenv.config();

const { DB_HOST, PORT = 7999 } = process.env;

const serverRunning = async () => {
  try {
    await dbConnection(DB_HOST || '');
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    const runningError = error as Error;
    console.log(runningError.message);
    process.exit(1);
  }
};

serverRunning();
