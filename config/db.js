import chalk from 'chalk';
import mongoose from 'mongoose';
mongoose.Promise = Promise;

export default function() {
  const mongoURI = process.env.MONGODB_HOST;
  const mongoDB = mongoose.connect(mongoURI).connection;

  mongoDB.on('error', err => {
    console.log(chalk.red('🔺  Connection to database failed'));
    console.log(err.message);
  });
  mongoDB.once('open', () => {
    console.log(chalk.cyan('✨  Connection to database established'));
  });
}
