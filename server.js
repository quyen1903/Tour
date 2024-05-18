const app = require('./app')
const dotenv = require('dotenv');
const https = require('node:https');
const fs = require('node:fs');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
  
});

dotenv.config({ path: './config.env' });
const port = process.env.PORT;


process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// const server = app.listen(port, () => {
//   console.log(`App running on port ${port}...`);
// });

const creadential={ 
  key: fs.readFileSync('./ssl/key.pem'),
  cert: fs.readFileSync('./ssl/cert.pem')
}
const server=https.createServer(creadential,app);

server.listen(port,()=>{
  console.log(`Secure server is listening on port ${port}`)
})