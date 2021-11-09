let fs = require('fs');
const path = require('path');
const {rm} = require('fs/promises')

const folder = path.join(__dirname, 'files');
const folderCopy = path.join(__dirname, 'files-copy');

const delDir = async () => {
  await rm(folderCopy, {recursive: true, force: true});
}

function copyDir() {
  const files = fs.readdir(folder, { withFileTypes: true },
    (err, files) => {
    console.log("\n Start copy file:");
    if (err)
      console.log(err);
    else {  
      fs.access(folderCopy, fs.constants.F_OK, (err) => {
        console.log('\nChecking for the presence of a folder');
        if (err) {  
          fs.mkdir(path.join(__dirname, 'files-copy'), (err) => {
            if (err) {
              throw err
            } else {
              console.log('Folder created')
            }
          });
        } else {
          console.log('The folder exists');
        }
        files.forEach(file => {
          const pathToFile = path.join(__dirname, `files/${file.name}`);
          const pathToFileCopy = path.join(__dirname, `files-copy/${file.name}`);
          fs.createReadStream(pathToFile).pipe(fs.createWriteStream(pathToFileCopy));
        })
  
        console.log('Files copied successfully');
      });
    }
  })
} 

const start = async () => {
  await delDir();
  await copyDir();
}

start();