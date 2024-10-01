// reads from a file
const fs = require('fs').promises;

const readFile = async (filename) => {
    try {
        const data = await fs.readFile(filename, 'utf-8');
        console.log('File content: ', data);
    } catch (err) {
        console.error('Error reading file: ', err);
    }
}

readFile('example.txt')
