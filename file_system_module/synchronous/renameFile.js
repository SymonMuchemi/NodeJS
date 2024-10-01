// uses fs.rename to rename a file
const fs = require('fs');

fs.rename('myFile.txt', 'myRenamedFile.txt', (err) => {
    if (err) throw err;

    console.log('File renamed successfully!');
})
