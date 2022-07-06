const { request, response } = require('express');
const Schedule = require('../models/scheduler');


module.exports = app => {
  app.get('/atendimentos', (_, response) => {
    Schedule.list(response);
  });

  app.get('/atendimentos/:id', (request, response) => {
    // console.log(request.params);
    Schedule.findById(response, Number(request.params.id));
  });

  app.post('/atendimentos', (request, response) => {
    
    const schedule = request.body;
    Schedule.add(schedule, response);

  });

  app.patch('/atendimentos/:id', (request, response) => {

    const values = request.body;
    Schedule.updateById(response, parseInt(request.params.id), values);
  });

  app.delete('/atendimentos/:id', (request, response) => {

    Schedule.deleteById(response, parseInt(request.params.id));
  });
}

  



