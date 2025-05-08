const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

function cleanString(str) {
  return str.replace(/[^\w\s]/g, '').replace(/\s+/g, '_'); 
}

const inputFolder = './csv/';
const outputFolder = './json/';

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

fs.readdir(inputFolder, (err, files) => {
  if (err) {
    console.error('Greška:', err);
    return;
  }

  const csvFiles = files.filter(file => file.endsWith('.csv'));

  csvFiles.forEach(file => {
    const inputPath = path.join(inputFolder, file);
    const outputPath = path.join(outputFolder, file.replace('.csv', '.json'));
    const results = [];

    let counter = 1;
    let isFirstRow = true;

    fs.createReadStream(inputPath)
      .pipe(csv({ separator: ';'}))
      .on('data', (row) => {
        if(isFirstRow){
          type = cleanString(Object.keys(row).join('_')) || 'GenericEntity';
          isFirstRow = false;
        }

        const id = `entity_${String(counter).padStart(3, '0')}`;

        const entity = { id, type };

        Object.entries(row).forEach(([key, val]) => {

          if (key.trim() === "") key == 'GenericName'; 

          const cleanedKey = cleanString(key);
          const numberVal = parseFloat(val);
          entity[key] = {
            value: isNaN(numberVal) ? val : numberVal,
            type: isNaN(numberVal) ? 'Text' : 'Number'
          };
        });

        results.push(entity);
        counter++;
      })
      .on('end', () => {
        fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
        console.log(`${file} konvertovan u ${outputPath}`);
      });
  });
});
