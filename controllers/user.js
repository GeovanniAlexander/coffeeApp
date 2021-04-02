const userModel = require('../models/user');
const bcryptjs = require('bcryptjs');

const userGet = async (req,res) => {
    const { from = 0, to = 5} = req.query;
    const query = { userStatus: true };
    const [ total, users ] = await Promise.all([
        userModel.countDocuments( query ),
        userModel.find( query )
        .skip(Number(from))
        .limit(Number(to))
    ]);
    res.json({
        total,
        users
    });
}

const userPost = async (req,res) => {
    const { name, email, password, rol } = req.body;
    const user = new userModel({ name, email, password, rol });
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );
    await user.save();
    res.send( user );
}

const userIdGet = (req,res) => {
    const id = req.params.id;

    res.send({
        mgs:'hello world',
        id
    });
}

const userPut = async (req, res) => {
    const id = req.params.id;
    const { _id, email, password, google, ...userUpd} = req.body;

    if (password){
        const salt = bcryptjs.genSaltSync();
        userUpd.password = bcryptjs.hashSync( password, salt );
    }

    const user = await userModel.findByIdAndUpdate( id, userUpd);

    res.send(user);
}

const userDelete = async(req, res) =>{
    const id = req.params.id;
    const user = await userModel.findByIdAndUpdate(id, { userStatus: false });
    res.send({user});
}

module.exports = { 
    userGet, 
    userPost, 
    userIdGet, 
    userPut, 
    userDelete 
}