import http from 'http';
import app from './src/app.js';
import dotenv from 'dotenv';
dotenv.config({path: "./src/.env"});


const PORT = process.env.PORT || 3000



const server = http.createServer(app)

server.listen(PORT, function() {
   console.log(`SERVER RUNNING... http://localhost:${PORT}/`) 
})