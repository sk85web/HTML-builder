const fs = require ('fs');
const path = require ('path')
const pathToFolder = path.join(__dirname, 'secret-folder');

    fs.readdir(pathToFolder, {withFileTypes: true}, (err, files) => {
       files.forEach(file => {
            if(file.isFile()) {
                const fullFileName = file.name
                const indexOfPoint = fullFileName.indexOf('.')
                const fileName = fullFileName.slice(0, indexOfPoint)
                const extFileName = path.extname(fullFileName).slice(1)
                fs.stat(path.join(pathToFolder, `${fullFileName}`), (err, stats) => {
                    if(err) {
                        console.error(err)
                    }else {
                        const fileSize = stats.size  
                        console.log(`${fileName} - ${extFileName} - ${fileSize}b`)
                    }
                })  
            }
       });
    });
