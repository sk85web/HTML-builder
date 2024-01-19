// const path = require('path')
// const myPath = 'd:\Программирование\rs-school\HTML-builder\01-read-file\index.js'
// const fs = require('fs')

// const pathInfo = {
//     // fileName: path.basename(myPath)
//     // folderName: path.dirname(myPath)
//     fileExtension: path.extname(myPath),
//     absoluteOrNot: path.isAbsolute(myPath),
//     detailInfo: path.parse(myPath),
// }

// fs.mkdir('./myFolder', (err) => {
//     if(err) {    console.log('Error')
// }
//     else {
//      console.log('Folder created successfully')
//     }
// })

// const data = 'Hi, this is a new nodeFile.txt'
// const newData = '\n And hi once more time, this is another info.txt'

// How to create and write to a file asynchronously using

// fs.writeFile('./myFolder/nodeFile.txt', data, (err) => {
//     err ? console.log('Unsuccessfull attempt') : console.log('All is good')
// })

// fs.writeFile('./myFolder/nodeFile.txt', newData, {flag: 'a'}, (err) => {
//     err ? console.log('Unsuccessfull attempt') : console.log('All is good')
// })

// console.log(path.join('grandParentFolder', 'parentFolder', 'child.txt'))
// console.log(path.resolve('grandParentFolder', 'parentFolder', 'child.txt'))

// fs.readFile('./myFolder/nodeFile.txt', {encoding: 'utf-8'}, (err, data) => {
//     if(err) {
//         console.log('Error!')
//     }else {
//         console.log('File is successfully! Here is data')
//         console.log(data)
//     }
// })


// Reading and Writing to a File Synchronously
// try {
//     fs.writeFileSync('./myFolder/syncNodeFile.txt', 'my syncFile say hi')
//     console.log('Write operation successful')

//     const fileData = fs.readFileSync('./myFolder/syncNodeFile.txt', {encoding: 'utf-8'})
//     console.log('Read operation successful. Here is the data:')
//     console.log(fileData)
// } catch (error) {
//     console.log('Error occurred!');
//     console.log(err);
// }

// How to read the contents of a directory using

// fs.readdir('./myFolder', (err, files) => {
//     if(err) {console.log('Error')}
//     console.log('All is good')
//     console.log(files)
// })

// fs.rename('./myFolder/nodeFile.txt', './myFolder/asyncNodeFile.txt', (err) => {
//     if(err) {
//         console.log('Error!') 
//         return
//     }
//     console.log('Rename is successful')
// })

// How to delete a file using

// fs.writeFile('./myFolder/test.txt', data, (err) => {
//     err ? console.log('Error!') : console.log('Successfuly writing')
// })

// fs.unlink('./myFolder/test.txt', (err) => {
//     err ? console.log('Error!') : console.log('Successfuly removing')
// })

// Event-Driven Programming
// const EventEmitter = require('events')
// const myEmitter = new EventEmitter()

// // Listener Function - welcomeUser()
// const sayHello = () => {
// 	console.log('Hello User');
// }

// const sayHi = () => {
// 	console.log('Hi User');
// }

// const greetNewYear = () => {
// 	console.log('Happy New Year!');
// }

// Listening for the userJoined event using the on() method
// myEmitter.on('userJoined', sayHello);
// myEmitter.on('userJoined', sayHi);
// myEmitter.on('userJoined', greetNewYear);

// Emitting the userJoined event using the emit() method

// myEmitter.emit('userJoined')

// const greetBirthday = (name, newAge) => {
//     // name = John
//     // newAge = 24
//     console.log(`Happy Birthday ${name}. You are now ${newAge}!`);
// }
// myEmitter.on('birthdayEvent', greetBirthday)
// myEmitter.emit('birthdayEvent', 'John', 24)

//=============================================== Node materials ==============
// const { stdout } = process;
// stdout.write("Node.js");
// const { stdout, stdin, stderr } = process
// stdin.on('data', (data) => stdout.write(data))

// process.on("exit", () => stdout.write("Good luck learning Node.js!"))
// process.on("exit", (code) => {
//   if (code === 0) {
//     stdout.write("Everything is ok");
//   } else {
//     stderr.write(`Something went wrong. The program exited with code ${code}`);
//   }
// });

// Task 1 -> Write a program that asks the user for their name, greets them after entering the name, and then stops its execution, saying goodbye to the user.
// let name = ''
// const {stdin, stdout} = process
// stdout.write('What is yor name? \n')
// stdin.on('data', (data) => {
//     name = data
//     stdout.write(`Hello ${data}`)
//     process.exit()
// })
// process.on('exit', () => stdout.write(`Good bye, ${name}`))



// fs.readFile(path.resolve(__dirname, 'test.txt'), {encoding: 'utf-8'}, (err, data) => {
//     if(err) {
//         throw err
//     }
//     console.log(data)
// })
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
stream.on('error', (err) => stdout.write(err))