const csvToNgsi = require('../uploadData/csv-to-ngsiv2');
const postEntities = require('../uploadData/postEntities');


const uploadData = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const filePath = req.file.path;
    const entities = await csvToNgsi(filePath);
    await postEntities(entities);

    res.json({ message: 'The data has been successfully converted and sent to the Context Broker.' });
  } catch (err) {
    console.error('Error in uploadData:', err);
    res.status(500).json({ error: 'Error while processing the file.' });
  }
};


module.exports = uploadData;
