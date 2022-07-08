const executeStatement = require('../infra/database/sql_statements');

class Scheduling {

  constructor () {
    console.log('new Scheduling (repository)...');
  }
  create(schedule) {
    const DML_STATEMENT = 'INSERT INTO petshop.schedules SET ?';
    return executeStatement(DML_STATEMENT, schedule);
  }

  getAll() {
    const DQL_STATEMENT = 'SELECT * FROM petshop.schedules';
    return executeStatement(DQL_STATEMENT);
  }
}

module.exports = new Scheduling();
