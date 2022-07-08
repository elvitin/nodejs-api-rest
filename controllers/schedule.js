const Schedule = require('../models/schedule');

module.exports = app => {
  // GET ALL OCCURRENCES
  app.get('/atendimento', (_, response) => {
    Schedule.getAll()
      .then(result => {
        response.json(result); // status
      })
      .catch(error => response.status(400).json(error));
  });

  // GET BY OCCURRENCES
  app.get('/atendimento/:id', (request, response) => {
    // console.log(request.params);
    Schedule.findById(response, Number(request.params.id));
  });

  // CREATE
  app.post('/atendimento', (request, response) => {
    const schedule = request.body;
    Schedule.create(schedule)
      .then(okSchedule => response.status(201).json(okSchedule))
      .catch(error => response.status(400).json(error));
  });

  // PARTIAL UPDATE
  app.patch('/atendimento/:id', (request, response) => {
    const values = request.body;
    Schedule.updateById(response, parseInt(request.params.id), values);
  });

  // DELETE
  app.delete('/atendimento/:id', (request, response) => {
    Schedule.deleteById(response, parseInt(request.params.id));
  });
};
