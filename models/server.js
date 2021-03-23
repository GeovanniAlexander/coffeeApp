const express = require('express');
const cors = require('cors');

const userRoutes = require('../routes/user');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.connectDb();
        this.middlewares();
        this.routes();
    }

    async connectDb(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use('/user', userRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`listen on port ${ this.port }`);
        })
    }

}

module.exports = Server;