const express = require('express');
const cors = require('cors');

const categoriesRoutes = require('../routes/categories');
const authRoutes = require('../routes/auth');
const userRoutes = require('../routes/user');
const productRoutes = require('../routes/products'); 
const searcRoutes = require('../routes/search');

const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.pathRoutes = {
            auth:       '/auth',
            categories: '/categories',
            user:       '/user',
            product:    '/products',
            search:     '/search',
        }

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
        this.app.use(this.pathRoutes.auth, authRoutes);
        this.app.use(this.pathRoutes.categories, categoriesRoutes);
        this.app.use(this.pathRoutes.user, userRoutes);
        this.app.use(this.pathRoutes.product, productRoutes);
        this.app.use(this.pathRoutes.search, searcRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`listen on port ${ this.port }`);
        })
    }

}

module.exports = Server;