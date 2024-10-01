// uses fs.unlink to delete a file
const fs = require('fs');

fs.unlink('myFile.txt', (err) => {
    if (err) throw err;

    console.log('File deleted successfully!');
});
