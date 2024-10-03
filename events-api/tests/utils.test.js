import fs from 'fs/promises';
import { appendToFile } from '../utils';


jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn(),
  }
}));

describe('appendToJsonFile', () => {
  it('should append new data to the JSON file', async () => {
    // Mock the initial file content
    const mockData = JSON.stringify([
      { id: 1, name: "task1", completed: false },
      { id: 2, name: "task2", completed: true }
    ]);

    const newTodo = { id: 3, name: "task3", completed: false };

    // Mock the readFile method to return the mock data
    fs.readFile.mockResolvedValue(mockData);

    // Call the function being tested
    await appendToJsonFile(newTodo);

    // Assert that readFile was called correctly
    expect(fs.readFile).toHaveBeenCalledWith('./data.json', 'utf8');

    // Assert that writeFile was called with updated data
    const expectedData = JSON.stringify([
      { id: 1, name: "task1", completed: false },
      { id: 2, name: "task2", completed: true },
      { id: 3, name: "task3", completed: false }
    ], null, 2);
    
    expect(fs.writeFile).toHaveBeenCalledWith('./data.json', expectedData);
  });

  it('should handle JSON parsing errors', async () => {
    // Mock readFile to return invalid JSON
    fs.readFile.mockResolvedValue('invalid JSON');

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const newTodo = { id: 3, name: "task3", completed: false };

    // Call the function being tested
    await appendToJsonFile(newTodo);

    // Assert that the console.error was called with the error
    expect(consoleErrorSpy).toHaveBeenCalled();

    // Cleanup the mock
    consoleErrorSpy.mockRestore();
  });
});
