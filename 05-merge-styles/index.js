let fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'styles');
const folderTwo = path.join(__dirname, 'test-files/styles');
const fileCopy = path.join(__dirname, 'project-dist/bundle.css');

function bundle() {
  fs.writeFile(fileCopy, '', err => {if (err) {throw err}})
  const files = fs.readdir(folder, { withFileTypes: true },
    (err, files) => {
    if (err)
      console.log(err);
    else {  
      files.forEach(file => {
        let fileInf = path.join(__dirname, 'styles', file.name);
        let fileExt = path.parse(fileInf).ext;
        if (file.isFile() && fileExt == '.css') {
          const filePath = path.join(__dirname, 'styles', file.name);
          const readStream = fs.createReadStream(filePath, 'utf-8');
          let text = ''
          readStream.on('data', (data) => text += data);
          readStream.on('end', () => fs.appendFile(fileCopy, text, () => ''));
        }
      })
    }
  })
  const filesTwo = fs.readdir(folderTwo, { withFileTypes: true },
    (err, files) => {
    if (err)
      console.log(err);
    else {  
      files.forEach(file => {
        let fileInf = path.join(__dirname, 'styles', file.name);
        let fileExt = path.parse(fileInf).ext;
        if (file.isFile() && fileExt == '.css') {
          const filePath = path.join(__dirname, 'test-files/styles', file.name);
          const readStream = fs.createReadStream(filePath, 'utf-8');
          let text = ''
          readStream.on('data', (data) => text += data);
          readStream.on('end', () => fs.appendFile(fileCopy, text, () => ''));
        }
      })
    }
  })
} 

bundle();