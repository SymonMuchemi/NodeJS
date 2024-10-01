// uses writeFile to update a file
const fs = require('fs').promises;

const updateFile2 = async (filename, content) => {
    try {
        await fs.writeFile(filename, content);
        console.log('File updated successfully!');
    } catch (error) {
        console.error('Error updating file: ', error);
    }
}

updateFile2('example.txt', 'There should be no line above me!');
