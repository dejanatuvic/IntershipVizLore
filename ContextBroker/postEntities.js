const fs = require ('fs');
const axios = require('axios');

const entities = JSON.parse(fs.readFileSync('json/On-Line Parameter RALF(21.08.json'));

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