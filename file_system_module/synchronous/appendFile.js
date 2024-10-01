// creates a new file using the append function
const fs = require('fs');


fs.appendFile('newFile.txt', 'This was just created!',(err) => {
    if (err){
        throw err;
    };

    console.log('Saved successfully!');
})
