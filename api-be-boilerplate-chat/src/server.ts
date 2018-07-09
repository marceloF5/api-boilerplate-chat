import * as http from 'http';
import * as Mongoose from 'mongoose';

import { normalizePort, onListening, onError } from './utils/utils';

import app from './app';
import db from './models/config.models';
import { normalize } from 'path';

const server = http.createServer(app);
const port = normalizePort(process.env.port || 3001);

db.mongoose.on('connected', () => {  
  console.log(`Connected in MongoDB`)
  server.listen(port);
  server.on('error', onError(server));
  server.on('listening', onListening(server))
});

db.mongoose.on('error', (error) => {
  console.error.bind(console, `It was not possible keep connect with MongoDB`);
});

db.mongoose.on('disconnected', () => {
  console.log(`Disconnected in MongoDB`);
})

process.on('SIGINT', () => {
  db.mongoose.close(() => {
    console.log(`Application is finalized!`);
    process.exit(0);
  })
})


