const connection = require('../infra/database/connection');
const repository = require('../repository/schedule');

const moment = require('moment');
const axios = require('axios');


class Scheduler {

  #PTBR_DATE_FMT = 'DD/MM/YYYY';

  constructor() {
    console.log('new Scheduler (models)...');

    this.dateIsValid = ({ serviceDate, registrationDate }) => {
      return moment(serviceDate).isAfter(registrationDate);
    };

    this.clientIsValid = ({ idSize }) => idSize >= 3;

    this.validatorObjects = [
      {
        errorObj: 'serviceDate',
        isValid: this.dateIsValid,
        message: 'A data e o horário deve ser maior ou igual a data de hoje',
      },
      {
        errorObj: 'client',
        isValid: this.clientIsValid,
        message: 'Tamanho do CPF inválido',
      },
    ];
  }

  #validation(parameters) {
    return this.validatorObjects.filter(item => {
      const { errorObj } = item;
      const parameter = parameters[errorObj];
      return !item.isValid(parameter);
    });
  }

  #getCurrentDateTime() {
    return moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
  }

  #convertBrToUsFormat(date) {
    return moment(date, this.#PTBR_DATE_FMT, true).format(
      moment.HTML5_FMT.DATETIME_LOCAL_SECONDS
    );
  }

  async create(schedule) {

    const registrationDate = this.#getCurrentDateTime();
    const serviceDate = this.#convertBrToUsFormat(schedule.serviceDate);

    const parameters = {
      serviceDate: { serviceDate, registrationDate },
      client: { idSize: schedule.client.length },
    };

    const errors = this.#validation(parameters);
    if (errors.length) {
      return new Promise((_, reject) => reject(errors));
    }

    const datedSchedule = { ...schedule, serviceDate };
    const result = await repository.create(datedSchedule);
    console.log('Modelo Resolveu');
    const id = result.insertId;
    return { ...schedule, id };
  }

  getAll() {
    return repository.getAll()
  }

  findById(response, id) {
    const dqlSql = `SELECT * FROM petshop.schedules WHERE id = ${id}`;

    connection.query(dqlSql, async (error, result) => {
      const schedule = result[0];
      const cpf = schedule.client;

      if (!error) {
        const { data } = await axios.get(`http://localhost:8082/${cpf}`);
        schedule.client = data;
        response.status(200).json(schedule);
        return;
      }
      response.status(400).json(error);
    });
  }

  updateById(response, id, values) {
    if (values.serviceDate)
      values.serviceDate = moment(values.serviceDate, 'DD/MM/YYYY').format(
        'YYYY-MM-DD HH:MM:SS'
      );

    const sql = `UPDATE petshop.schedules SET ? WHERE id = ?`;

    connection.query(sql, [values, id], (error, result) => {
      if (!error) {
        response.status(200).json(result);
        return;
      }

      response.status(400).json(error);
    });
  }

  deleteById(response, id) {
    const sql = 'DELETE FROM petshop.schedules WHERE id = ?';
    connection.query(sql, id, (error, result) => {
      if (!error) {
        response.status(200).json({ id });
        return;
      }
      response.status(400).json(error);
    });
  }
}

module.exports = new Scheduler();
