class Tables {

  init(connection) {
    this.connection = connection;
    this.createSchedules();
  }

  createSchedules() {
    const sql = `
      CREATE TABLE IF NOT EXISTS schedules (
        id SERIAL,
        cliente VARCHAR(50) NOT NULL,
        pet VARCHAR(50) NOT NULL,
        servico VARCHAR(50) NOT NULL,
        data_agendamento DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        data_atendimento DATETIME NOT NULL,
        status VARCHAR(20) NOT NULL,
        observacoes TEXT
      );
    `.trim();
    
    
    this.connection.query(sql, (error) => {

      if (error) {
        console.log(error);
      } else {
        console.log('Create Table Sucessful');
      }
    });
  }
}

module.exports = new Tables;