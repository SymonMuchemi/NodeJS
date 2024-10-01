// renames a file
const fs = require('fs').promises;

const renameFile = async (filename, newName) => {
    try {
        await fs.rename(filename, newName);
        console.log('Rename file successfully!');
    } catch (error) {
        console.error('Error renaming file: ', error)
    }
}

renameFile('newFileWithPromises.txt', 'example.txt');
