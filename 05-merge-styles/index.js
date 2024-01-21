const path = require('path')
const fs = require('fs')

// создаю writestream в текущей папке с нужным названием
const writeStream = fs.createWriteStream(
    path.join(__dirname, "project-dist/bundle.css")
  );

const pathToStyles = path.join(__dirname, 'styles')

fs.readdir(pathToStyles, {withFileTypes: true}, (err, files) => {
    if(err)  {
        console.log('Error on reading ' + err)
        return
    }
    files.forEach(file => {
        if(file.isFile()) {
            const fullFileName = file.name
            const extFileName = path.extname(fullFileName).slice(1)
            
            if(extFileName === 'css') {
                //здесь я читаю каждый файл .css
                const readStream = fs.createReadStream(path.join(pathToStyles, fullFileName), (err) => {
                    if(err) {
                        console.log('Error in readStream! ' + err)
                        return
                    }
                })
                //создаю событие: когда data получена, записываю по чанкам в writestream
                readStream.on('data', (chunk) => {
                    writeStream.write(chunk);
                });
            }
        }
    })
})