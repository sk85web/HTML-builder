// 1. Import all required modules.
const fs = require('fs/promises')
const path = require('path')

const pathToProject = path.join(__dirname, 'project-dist')
const pathToStyles = path.join(__dirname, 'styles')


// 2. Read and save the template file in a variable.
let htmlTemplate = ''
const readTemplateFile = fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
    if(err) {
        console.log('Error: ' + err)
        return 
    }
})

htmlTemplate = readTemplateFile