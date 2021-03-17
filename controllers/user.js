

const userGet = (req,res) => {

    const { name, id = 10, mensaje } = req.query;
    res.send({
        msg:'hello world',
        name,
        id,
        mensaje
    });
}

const userPost = (req,res) => {
    res.send(req.body);
}

const userIdGet = (req,res) => {

    const id = req.params.id;

    res.send({
        mgs:'hello world',
        id
    });
}


module.exports = { userGet, userPost, userIdGet }