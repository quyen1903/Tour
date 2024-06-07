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

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// const server = app.listen(process.env.PORT, () => {
//   console.log(`App running on port ${process.env.PORT}...`);
// });

const creadential={ 
  key: fs.readFileSync('./ssl/key.pem'),
  cert: fs.readFileSync('./ssl/cert.pem')
}
const server=https.createServer(creadential,app);

server.listen(process.env.PORT,process.env.IP_ADDRESS,()=>{
  console.log(`Secure server is listening on port ${process.env.PORT}`)
})