const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

function cleanString(str) {
  return str.replace(/[^\w\s]/g, '').replace(/\s+/g, '_'); 
}

function convertData(filePath){
  return new Promise((resolve, reject) => {
    const results = [];
    let counter = 1;
    let counter2 = 1;
    let isFirstRow = true;
    const fileName = path.basename(filePath, path.extname(filePath));
    const fileCounter = cleanString(fileName);
    let type = 'GenericEntity';

    fs.createReadStream(filePath)
      .pipe(csv({ separator: ';'}))
      .on('data', (row) => {
        if(isFirstRow){
          type = cleanString(Object.keys(row).join('_').slice(0, 100)) || 'GenericEntity';
          isFirstRow = false;
        }

        const id = `${fileCounter}_${String(counter).padStart(3, '0')}`;

        const entity = { id, type };

        Object.entries(row).forEach(([key, val]) => {

          let cleanedKey = cleanString(key.trim());

          if(!cleanedKey){
            cleanedKey = `attribut_${String(counter2).padStart(3, '0')}`;
            counter2++;
          }
          const numberVal = parseFloat(val);
          entity[cleanedKey] = {
            value: isNaN(numberVal) ? val : numberVal,
            type: isNaN(numberVal) ? 'Text' : 'Number'
          };
        });

        results.push(entity);
        counter++;
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) =>{
        reject(error);
      });

  });
}

module.exports = convertData;

// const inputFolder = './csv/';
// const outputFolder = './json/';

// if (!fs.existsSync(outputFolder)) {
//   fs.mkdirSync(outputFolder);
// }

// fs.readdir(inputFolder, (err, files) => {
//   if (err) {
//     console.error('Greška:', err);
//     return;
//   }

//   const csvFiles = files.filter(file => file.endsWith('.csv'));

//   csvFiles.forEach((file, fileIndex) => {
//     const inputPath = path.join(inputFolder, file);
//     const outputPath = path.join(outputFolder, file.replace('.csv', '.json'));
//     const results = [];

//     let counter = 1;
//     let isFirstRow = true;
//     let counter2 = 1;

//     const fileCounter = `fajl${fileIndex + 1}`;

//     fs.createReadStream(inputPath)
//       .pipe(csv({ separator: ';'}))
//       .on('data', (row) => {
//         if(isFirstRow){
//           type = cleanString(Object.keys(row).join('_').slice(0, 100)) || 'GenericEntity';
//           isFirstRow = false;
//         }

//         const id = `entity_${fileCounter}_${String(counter).padStart(3, '0')}`;

//         const entity = { id, type };

//         Object.entries(row).forEach(([key, val]) => {

//           let cleanedKey = cleanString(key.trim());

//           if(!cleanedKey){
//             cleanedKey = `attribut_${String(counter2).padStart(3, '0')}`;
//             counter2++;
//           }
//           const numberVal = parseFloat(val);
//           entity[cleanedKey] = {
//             value: isNaN(numberVal) ? val : numberVal,
//             type: isNaN(numberVal) ? 'Text' : 'Number'
//           };
//         });

//         results.push(entity);
//         counter++;
//       })
//       .on('end', () => {
//         fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
//         console.log(`${file} konvertovan u ${outputPath}`);
//       });
//   });
// });
