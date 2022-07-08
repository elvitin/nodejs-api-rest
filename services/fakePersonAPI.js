const express = require('express');
const bodyParser = require('body-parser');
const faker = require('faker');

const app = new express();

app.use(bodyParser());

app.get('/:cpf', (req, res) => {
  setTimeout(_ => {
    const { cpf } = req.params;
    res.status(200).json({
      cpf,
      name: faker.name.findName(),
      birthDate: faker.date.past(),
    });
  }, 3000);
});

app.listen(8082, _ => console.log('FakePerson API is running'));
