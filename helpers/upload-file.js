const path = require('path');
const { v4: uuidv4 } = require('uuid');
uuidv4();

const helpUploadFile = (files, validExt, folder = '') => {
    
    return new Promise((resolve, reject) => {
        const { file } = files;
        const ext = file.name.split('.').pop();

        if( !validExt.includes(ext) ){
            return reject(`la extension .${ ext } no es permitida` );
        }

        const fileName  = `${ uuidv4() }.${ ext }`;
        const uploadPath = path.join(__dirname, '../uploads/', folder, fileName);

        file.mv(uploadPath, function(err) {
            if (err) {
                reject(err);
            }

            resolve( fileName );
        });
    })
    
}

module.exports = helpUploadFile;