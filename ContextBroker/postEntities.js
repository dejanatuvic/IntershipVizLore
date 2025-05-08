const fs = require ('fs');
const axios = require('axios');

const entities = JSON.parse(fs.readFileSync('json/20240826_ZEST_R4_Clean(Raw_Data).json'));

entities.forEach(async (entitiy) => {
    try {
        await axios.post('http://localhost:1026/v2/entities', entitiy, {
            headers: {'Content-Type': 'application/json'}
        });
        console.log('Poslat entitet');
    } catch (error) {
    if (error.response) {
         console.error(`Opis: ${JSON.stringify(error.response.data, null, 2)}`);
    } else {
        console.error(error.message);
}
    }
});