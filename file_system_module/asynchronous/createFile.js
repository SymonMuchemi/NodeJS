// writes to a file
const fs = require('fs').promises;

const createFile = async (filename, content) => {
    try {
        await fs.writeFile(filename, content);
        console.log('File created successfully!');
    } catch (err) {
        console.error('Error writing file: ', err);
    }
}

createFile('newFileWithPromises.txt', 'This file was created asynchronously!');
