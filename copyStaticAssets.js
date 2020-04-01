const fs = require('fs'); // eslint-disable-line 
const path = require('path'); // eslint-disable-line 

fs.readdir(
    path.join(__dirname, 'public'),
    (err, d) => {
        if (err) throw err;
        for (const _ of d) {
            try {
                fs.mkdirSync(path.join(__dirname, "dist/view", _));
            } catch (e) {
                if (e.errno !== -17)
                    console.log(e);
            }
            fs.readdir(
                path.join(__dirname, './public', _),
                (err, names) => {
                    if (err) throw err;
                    for (const __ of names) {
                        fs.copyFile(
                            path.join(__dirname, './public', _, __),
                            path.join(__dirname, "dist/view", _, __),
                            () => {
                                console.log(`Copyed ${_}/${__}`);
                            }
                        );
                    }
                }
            )
        }
    }
)
