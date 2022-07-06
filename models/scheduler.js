const connection = require('../infra/connection');
const moment = require('moment');


class Scheduler {

  add(schedule, response) {

    console.log(schedule);

    const data_atendimento = moment(schedule.data_atendimento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
    const datedSchedule = { ...schedule, data_atendimento };

    const dataIsValid = moment(data_atendimento).isAfter(moment().format('YYYY-MM-DD HH:MM:SS'));
    const validations = [
      {
        errorObj: 'date',
        isValid: dataIsValid,
        message: 'Data deve ser maior ou igual a data de hoje'
      },
      {
        errorObj: 'client',
        isValid: schedule.cliente.length > 3,
        message: 'Tamanho de nome inválido'
      }
    ];

    const errors = validations.filter(obj => !obj.isValid);

    if (errors.length) {
      response.status(400).json(errors);
      return;
    }

    /**
     * ISSO É SINTAXE DO MY SQL, OBSERVAR A COMPATIBILIDADE COM OUTROS BANCOS
     */
    const sql = 'INSERT INTO schedules SET ?';
    connection.query(sql, datedSchedule, (error, result, fields) => {
      if (error) {
        response.status(400).json(error);
      } else {
        response.status(201).json(result);
      }
    });
  }

  list(response) {
    const sql = 'SELECT * FROM schedules';

    connection.query(sql, (error, result) => {

      if (!error){
        response.status(200).json(result);
        return;
      }
      response.status(400).json(error);
    });
  }

  findById(response, id) {
    const sql = `SELECT * FROM schedules WHERE id = ${id}`;

    connection.query(sql, (error, result) => {
      if(!error) {
        response.status(200).json(result[0]);
        return;
      }
      response.status(400).json(error);
    });
  }

  updateById(response, id, values) {

    if(values.data_atendimento)
      values.data_atendimento = moment(values.data_atendimento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

    const sql = `UPDATE schedules SET ? WHERE id = ?`;

    connection.query(sql, [values, id], (error, result)=> {

      if(!error){
        response.status(200).json(result);
        return;
      }

      response.status(400).json(error);
    });
  }

  deleteById(response, id) {
    const sql =  'DELETE FROM schedules WHERE id = ?';
    connection.query(sql, id, (error, result) => {

      if(!error)
      {
        response.status(200).json({ id });
        return;
      }
      response.status(400).json(error);
      
    });
  }
}

module.exports = new Scheduler();
