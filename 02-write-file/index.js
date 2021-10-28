const fs = require('fs');
const path = require('path');
const process = require('process');
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
console.log('Write now!')
process.on('beforeExit', () => sayBye())

const filePath = path.join(__dirname, 'text.txt')
let writebleStream = null;

rl.on('line', (input) => {
  if (writebleStream == null) {
    writebleStream = fs.createWriteStream(filePath);
  }
  if (input == 'exit') {
    sayBye();
    process.exit();
  }
  writebleStream.write(input + '\n')
});

function sayBye() {
  console.log('Bye bye')
}