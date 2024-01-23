// 1. Import all required modules.
const fs = require('fs/promises')
const fsPromise = require('fs')
const path = require('path')

const pathToSite = path.join(__dirname, 'project-dist')
const pathToStyles = path.join(__dirname, 'styles')
const pathToSiteStyles = path.join(pathToSite, 'style.css')

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

// 4. Replace template tags with the content of component files. 
    for(const file of htmlComponents) {
        const readComponentsFile = await fs.readFile(path.join(__dirname, 'components', file), 'utf-8', )
        const templateName = file.slice(0, file.indexOf('.'))
       htmlTemplate = htmlTemplate.replace(`{{${templateName}}}`, readComponentsFile)
    }

    await fs.writeFile(path.join(pathToSite, 'index.html'), htmlTemplate);
}

generateHTML() 

// 6. Use the script written in task **05-merge-styles** to create the `style.css` file.
const writeStream = fsPromise.createWriteStream(path.join(__dirname, "project-dist/style.css"));

fs.readdir(pathToStyles, {withFileTypes: true})
    .then(files => {
        files.forEach(file => {
        if(file.isFile()) {
            const fullFileName = file.name
            const extFileName = path.extname(fullFileName).slice(1)
            
            if(extFileName === 'css') {
                //здесь я читаю каждый файл .css
                const readStream = fsPromise.createReadStream(path.join(pathToStyles, fullFileName))
                //создаю событие: когда data получена, записываю по чанкам в writestream
                readStream.on('data', (chunk) => {
                    writeStream.write(chunk);
                });
            }
        }
    })
    })
    .catch(err => {
        console.log('Error on reading: ' + err)
    })
    
