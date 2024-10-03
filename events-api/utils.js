import fs from 'fs/promises';
import { readFileSync } from 'fs';

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
        const data = readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.log(`Error reading file from ${dataFilePath}: ${error}`);
        return null;
    }
}


/**
 * Updates an element in the data file with the given ID and new data.
 *
 * @param {string} id - The ID of the element to update.
 * @param {Object} newData - The new data to update the element with.
 * @returns {Promise<void>} - A promise that resolves when the update is complete.
 * @throws {Error} - Throws an error if there is an issue reading or writing the file.
 */
export async function updateElement(id, newData) {
    try {
        const data = await getFileData();
        const index = data.findIndex((obj) => obj.id === id);

        if (index !== -1) {
            data[index] = { ...data[index], ...newData };
            await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
            console.log(`Update operation success for ID: ${id}`);
        } else {
            console.log(`No entry found with ID: ${id}`);
        }
    } catch (error) {
        console.error(`Error updating data with ID ${id}: ${error}`);
        throw error;
    }
}
