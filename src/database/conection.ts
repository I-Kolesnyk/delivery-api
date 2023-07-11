import mongoose from "mongoose";

mongoose.set("strictQuery", true);

export const dbConnection = async (url: string) =>
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any);
