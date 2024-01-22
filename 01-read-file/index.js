const path = require('path')
const fs = require('fs')
const { stdout } = process;

const stream = fs.createReadStream(path.join(__dirname, 'text.txt'), {encoding: 'utf-8'})

const chunks = []
// Один чанк по дефолту 64kB 
stream.on('data', (chunk) => {
   chunks.push(chunk)
})

stream.on('end', () => stdout.write(chunks.join('')))
stream.on('open', () => stdout.write('Начали чтение файла' + '\n'))