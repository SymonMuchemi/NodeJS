import fs from 'fs/promises';

const dataFilePath = 'db.json';

/**
 * Write data to the data file
 * 
 * @param {string} data 
 * @returns {Promise<void>}
 */
export async function appendToFile(newEvent) {
    try {
        const data = await fs.readFile(dataFilePath, 'utf8');
        const events = JSON.parse(data);

        events.push(newEvent);

        await fs.writeFile(dataFilePath, JSON.stringify(events, null, 2));

        console.log('Write operation success!');
    } catch (err) {
        console.error(`Error writing to ${dataFilePath}: ${err}`);
    }
}

/**
 * Read data from the data file
 * 
 * @returns {Promise<string|null>} The content of the data file as a string, or null if an error occurs.
 */
export async function getFileData() {
    try {
        let data = await fs.readFile(dataFilePath, 'utf-8');
        data = JSON.parse(data);
        return data;
    } catch (error) {
        console.log(`Error getting data from ${dataFilePath}: ${error}`);
        return null;
    }
}


/**
 * Reads data from a file synchronously.
 *
 * @returns {string|null} The file data as a string if successful, otherwise null.
 *
 * @throws Will log an error message if reading the file fails.
 */
export function getFileDataSync() {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf-8');
        return data;
    } catch (error) {
        console.log(`Error reading file from ${dataFilePath}: ${err}`);
        return null;
    }
}
