const express = require('express');

const app = express();

app.listen(3000, () => {

  console.log('Servidor iniciou!');
});


app.get('/atendimentos', (request, response) => {
  response.send('Server is running! (Atendimentos)');
});

app.get('/agendamentos', (request, response) => {
  response.send('Server is running! (Agendamentos)');
});

