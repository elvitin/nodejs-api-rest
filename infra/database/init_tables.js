class Tables {

  init(connection) {
    this.connection = connection;
    this.createScheduleTable();
    this.createPetsTable();
  }

  createScheduleTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS schedules (
        id SERIAL,
        client VARCHAR(11) NOT NULL,
        pet VARCHAR(50) NOT NULL,
        service VARCHAR(50) NOT NULL,
        schedulingDate DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        serviceDate DATETIME NOT NULL,
        status VARCHAR(20) NOT NULL,
        notes TEXT
      );
    `;
    
    
    this.connection.query(sql, (error) => {

      if (error) {
        console.log(error);
      } else {
        console.log('The schedules table has been created');
      }
    });
  }

  createPetsTable() {
    const ddlQuery = `
      CREATE TABLE IF NOT EXISTS pets (
        id SERIAL,
        name VARCHAR(50) NOT NULL,
        image VARCHAR(200) NOT NULL
      )
    `;

    this.connection.query(ddlQuery, error => {

      if (!error) {
        console.log('The pets table has been created');
        return;
      }

      console.log(error);
    });
  }
}

module.exports = new Tables;