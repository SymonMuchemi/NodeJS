// uses fs.writeFIle to create a new file
const fs = require('fs');


fs.writeFile('createdUsingWriteFile.txt', 'Thus I exists!', (err) => {
    if (err) throw err;

    console.log('Saved successfully!');
})
