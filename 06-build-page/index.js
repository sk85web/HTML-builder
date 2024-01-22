const fs = require('fs/promises')
const path = require('path')

const pathToProject = path.join(__dirname, 'project-dist')
const pathToStyles = path.join(__dirname, 'styles')


let htmlTemplate = ''
const readTemplateFile = fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
    if(err) {
        console.log('Error: ' + err)
        return 
    }
})

htmlTemplate = readTemplateFile