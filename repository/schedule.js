const executeStatement = require('../infra/database/sql_statements');

class Scheduling {
  create(schedule) {
    const DML_STATEMENT = 'INSERT INTO schedules SET ?';
    return executeStatement(DML_STATEMENT, schedule);
  }

  getAll() {
    const DQL_STATEMENT = 'SELECT * FROM schedules';
    return executeStatement(DQL_STATEMENT);
  }
}

module.exports = new Scheduling();
