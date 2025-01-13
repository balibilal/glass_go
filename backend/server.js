import express from 'express';
import router from './routes/routes.js';
import authRoutes from './routes/authRoutes.js';
import { connectDB } from './database/db.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import {createServer} from "http";
import {Server} from "socket.io";


import * as dotenv from 'dotenv';
dotenv.config();
import path from 'path';
const __dirname = path.resolve();



const app = express();


const server = createServer(app);
const io = new Server(server, {
    cors:{
        origin: '*',
        methods: ['GET', 'POST']

    },
});





app.use('/uploads', express.static(path.join(__dirname, 'uploads')));





app.use(cors({
    origin: '*',
}));
app.use(cookieParser());
app.use(bodyParser.json());



app.use('/api', router);
app.use('/user', authRoutes);




// Middleware to parse JSON
app.use(express.json());





app.get("/", (req, res) => {
    res.send('Socket Io testing ');
});


io.on("connection", (socket) => {
    console.log('user connected', socket.id);

    socket.on('message', ({room, message}) => {
        console.log(message);
        io.to(room).emit('message', message);
    });



    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });
    
});




app.use((err, req, res, next) => {
    let error = {...err};
    error.message = err.message;

    if(err.name === 'validatorerror'){
        const message = Object.values(err.errors).map(value => value.message);
        error = new Error(message);
    }
    res.json({
        error: error.message,
    })
})

connectDB();

  
server.listen(process.env.PORT, ()=>{
    console.log(`App listening at port ${process.env.PORT}`);
})



// mongodb+srv://bilalnaqvi592:huvXfFJMvExeEgDu@optics-glass-cluster.1icwe.mongodb.net/
