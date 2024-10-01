const fs = require('fs').promises;

const updateFile = async (filename, content) => {
    try {
        await fs.appendFile(filename, content);
        console.log('Updated file successfully');
    } catch (error) {
        console.error('Error updating file: ', error);
    }
}

updateFile('example.txt', '\nThis is also added as an update!');
