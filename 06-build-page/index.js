// 1. Import all required modules.
const fs = require('fs/promises')
const path = require('path')

const pathToSite = path.join(__dirname, 'project-dist')
const pathToStyles = path.join(__dirname, 'styles')

async function generateHTML() {
    fs.mkdir(pathToSite, {recursive: true})
// 2. Read and save the template file in a variable.
    const readTemplateFile = await fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
    if(err) {
        console.log('Error in readfile ./template.html: ' + err)
        return 
    }
    })

    let htmlTemplate = readTemplateFile

// 3. Find all tag names in the template file.

    const htmlComponents = await fs.readdir(path.join(__dirname, 'components'), (err, data) => {
    if(err) {
        console.log('Error in read ./components: ' + err)
        return 
    }
})

// 4. Replace template tags with the content of component files. ---> Ошибка чтения файла, надо разбираться
    htmlComponents.forEach(file => {
    const readComponentsFile = fs.readFile(path.join(__dirname, 'components', file), 'utf-8', )
       htmlTemplate += readComponentsFile
})
    await fs.writeFile(path.join(pathToSite, 'index.html'), htmlTemplate);
}

generateHTML() 