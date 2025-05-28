const axios = require('axios');

async function postEntities(entities) {
    for (const entity of entities){
        try {
        await axios.post('http://orion:1026/v2/entities', entity, {
            headers: {'Content-Type': 'application/json'}
        });
        console.log('Entity send');
    } catch (error) {
    if (error.response) {
         console.error(`Error ${entity.id}: ${JSON.stringify(error.response.data, null, 2)}`);
    } else {
        console.error(error.message);
            }
        }
    }
}

module.exports = postEntities;