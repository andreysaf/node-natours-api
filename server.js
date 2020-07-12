const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

process.on('unhandledException', err => {
  console.log(err.name, err.message);
  console.log('Unhandled exception, shutting down...');
  process.exit(1);
});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true  }).then(con => {
  console.log('DB connection successful');
});

const app = require('./app');

const server = app.listen(process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}`);
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('Unhandled rejection, shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

