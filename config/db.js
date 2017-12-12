import chalk from "chalk";
import mongoose from "mongoose";

const configureDB = () => {
  mongoose.Promise = Promise;
  const mongoURI = process.env.MONGODB_HOST;
  const mongoDB = mongoose.connect(mongoURI).connection;

  if (process.env.NODE_ENV === "development") {
    mongoDB.on("error", err => {
      console.log(chalk.red("🔺  Connection to database failed"));
      console.log(err.message);
    });
    mongoDB.once("open", () => {
      console.log(chalk.cyan("✨  Connection to database established"));
    });
  }
};

export default configureDB;
