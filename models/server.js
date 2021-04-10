const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const categoriesRoutes = require('../routes/categories');
const authRoutes = require('../routes/auth');
const userRoutes = require('../routes/user');
const uploadRoutes = require('../routes/uploads');
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
            uploads:     '/uploads',
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
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        this.app.use(this.pathRoutes.auth, authRoutes);
        this.app.use(this.pathRoutes.categories, categoriesRoutes);
        this.app.use(this.pathRoutes.uploads, uploadRoutes);
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