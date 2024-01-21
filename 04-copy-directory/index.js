const fs = require('fs')
const path = require('path')
const pathToCopiedFolder = path.join(__dirname, 'files-copy')
const pathToFolder = path.join(__dirname, 'files')

// Удаляю из папки files-copy все файлы перед копированием
fs.readdir(pathToCopiedFolder, ((err, files) => {
    if(err) {
        console.log('Error: ' + err)
        return
    }
    files.forEach(file => {
        fs.unlink(path.join(pathToCopiedFolder, file), (err) => {
            if(err) console.log('Ошибка удаления')
            return
            console.log('Файл успешно удален')
        })
        
    })
}))

// Создаю папку и копирую туда все файлы
fs.mkdir(pathToCopiedFolder, {recursive: true}, (err) => {
    if(err) console.log('Error: ' + err)
    console.log('Копирование папки завершено')
        fs.readdir(pathToFolder, (err, files) => {
            files.forEach(file => {
            fs.copyFile(path.join(pathToFolder, file), (path.join(pathToCopiedFolder, file)), (err => {
                if(err) {
                    console.log('Возникли ошибки при копировании')
                    return 
                }
              }
              ))
            }) 
            console.log('Файлы успешно скопированы')
        })
    }
)
