const express = require('express');
const cors = require('cors');

const userRoutes = require('../routes/user');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.middlewares();
        this.routes();
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