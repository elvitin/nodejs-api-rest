const fs = require('fs');
const path = require('path');

/**
 * readFile and writeFile are cpu blocking functions
 * it is recommended to use streams functions
 */

// fs.readFile('./assets/sausage.jpg', (error, buffer) => {
//   console.log('Image has been buffered');
//   console.log(buffer);
//   fs.writeFile('./assets/sausage2.jpg', buffer, error => {
//     console.log('Image has been recorded');
//   });
// });

module.exports = (filePath, fileName, callbackFunction) => {

  const fileType = path.extname(filePath);
  const newfilePath = `./assets/images/${fileName}${fileType}`;
  
  const acceptedFileTypes = ['.jpg', '.png', '.jpeg'];
  const fileTypeIsValid = acceptedFileTypes.includes(fileType);

  
  if(!fileTypeIsValid) {
    const error = 'This file type is not allowed';
    callbackFunction(error, newfilePath)    
    return;
  }

  fs.createReadStream(filePath)
    .pipe(fs.createWriteStream(newfilePath))
    .on('finish', () => callbackFunction(false, newfilePath));
};
