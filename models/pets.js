const connection = require('../infra/database/connection');
const uploadFiles = require('../infra/resources/upload_files');

class Pet {
  constructor() {
    console.log('new Pet...');
  }
  create(pet, response) {
    const dmlSQL = 'INSERT INTO petshop.pets SET ?';

    uploadFiles(pet.image, pet.name, (error, newPath) => {
      if (error) {
        response.status(400).json({ error });
        return;
      }

      const newPet = { name: pet.name, image: newPath };

      connection.query(dmlSQL, newPet, (error) => {
        if (!error) {
          response.status(200).json(newPet);
          return;
        }

        console.log(error);
        response.status(400).json(error);
      });
    });
  }
}

module.exports = new Pet();
