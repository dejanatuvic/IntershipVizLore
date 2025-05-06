const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

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
          type = Object.keys(row).join(';');
          isFirstRow = false;
        }

        const id = `entity_${path.basename(file, '.csv')}_${String(counter).padStart(3, '0')}`;
       // const type = 'GenericEntity';

        const entity = { id, type };

        Object.entries(row).forEach(([key, val]) => {
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
