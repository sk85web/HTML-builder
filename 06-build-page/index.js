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

    // 7. Use the script from task **04-copy-directory** to move the `assets` folder into the `project-dist` folder.

     // Создаю папку и копирую туда все файлы
    const pathToAssets = path.join(__dirname, 'assets');
    const pathToSiteAssets = path.join(pathToSite, 'assets');

   async function copyAssetsFolder(sourceFolder, distFolder) {
    try {
        await fs.mkdir(distFolder, { recursive: true });
        const files = await fs.readdir(sourceFolder);

        // Удаляю папку перед копированием файлов
        clearFolder()  

        // !!! цикл forEach работает не корректно c await !!! Использую for ... of
        for (let file of files) {
            const sourceFolderFile = path.join(sourceFolder, file);
            const distFolderFile = path.join(distFolder, file);
            const stat = await fs.stat(sourceFolderFile);
            
            if (stat.isFile()) {
                await fs.copyFile(sourceFolderFile, distFolderFile);
            } else {
                await copyAssetsFolder(sourceFolderFile, distFolderFile);
            }
        }
        console.log('Файлы успешно скопированы');
    } catch (err) {
        console.log('Возникли ошибки при копировании:', err);
    }
}

// Добавил функцию очистки папки assets после каждого builda

async function clearFolder() {
    try {
        fs.readdir(pathToSiteAssets, async (err, files) => {
            if(err) {
                console.log('Error: ' + err)
                return
            }
             if( files) {
                 await fs.rm(pathToSiteAssets, { recursive: true });
                 console.log('Файл успешно удален')
            }
         })
    } catch (error) {
        console.log('Ошибка удаления')
    }
}


copyAssetsFolder(pathToAssets, pathToSiteAssets);
          
        
    
    
    
