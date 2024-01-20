const path = require('path')
const fs = require('fs')
const { stdin, stdout, exit } = process
const readline = require('readline')

const rl = readline.createInterface( stdin, stdout )
const output = fs.createWriteStream(path.join(__dirname, 'file.txt'))

stdout.write('Hello! Enter any information...\n')

rl.on('line', data => {
    if(data === 'exit') {
        exit()
    }
    output.write(`${data}\n`)
})
    
process.on('exit', () => {
    stdout.write('Thank you for information! Good Bye!')
    rl.close()
})

process.on('SIGINT', () => {
    exit()
})