// appends new data to a file using .appendFile() method
const fs = require('fs')

fs.appendFile('myFile.txt', '\nThis was added using .appendFIle().', (err) => {
    if (err) throw err;

    console.log('Updated!');
});

// updates by overwritting the file using .writeFile()
fs.writeFile('myFile.txt', 'Overwritten by fs.writeFile()', (err) => {
    if (err) throw err;

    console.log('Updated by fs.writeFile!')
})
