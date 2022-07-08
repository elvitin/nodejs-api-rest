const connection = require('./connection');

const executeStatement = (statement, parameters = '') => {
  return new Promise((resolve, reject) => {
    connection.query(statement, parameters, (error, results, fields) => {
      if (error) {
        console.log('rejetc!');
        reject(error);
      }

      console.log('resolve!');
      resolve(results);
    });
  });
};

module.exports = executeStatement;
