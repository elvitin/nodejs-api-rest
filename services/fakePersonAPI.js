const express = require('express');
const bodyParser = require('body-parser');
const faker = require('faker');

const app = new express();

app.use(bodyParser());

app.get('/:cpf', (req, res) => {
  const { cpf } = req.params;
  res.status(200).json({
    cpf,
    name: faker.name.findName(),
    birthDate: faker.date.past()
  });
});


app.listen(8082, () => console.log('FakePerson API is running'));