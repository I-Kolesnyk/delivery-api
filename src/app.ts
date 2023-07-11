import express, { Request, Response, NextFunction } from "express";
import logger from "morgan";
import cors from "cors";

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: "Error",
    code: 404,
    message: "Not found",
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({
    status: "Error",
    code: status,
    message: message,
  });
});

export default app;
