const fs = require('fs');
const path = require('path');
let f;
//let stats;

const folderPath = path.join(__dirname, 'secret-folder');
const files = fs.readdir(folderPath, { withFileTypes: true },
  (err, files) => {
  console.log("\ninformation about files in secret-folder:\n");
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
      if (file.isFile()) {
        const pathToFile = path.join(__dirname, `secret-folder/${file.name}`)
        stats = fs.statSync(pathToFile);
        f = path.parse(file.name);
        console.log(
          `${f.name} - ${f.ext.slice(1)} - ${Math.ceil(stats.size / 1024)}kb`
        )
      }
    })
  }
})