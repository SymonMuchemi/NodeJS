// deletes a file
const fs = require('fs').promises;

const deleteFile = async (filename) => {
    try {
        await fs.unlink(filename);
        console.log('File deleted successfully!');
    } catch (error) {
        console.error('Error deleting file: ', error);
    }
}

deleteFile('example.txt');
