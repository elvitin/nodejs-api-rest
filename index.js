const customExpress = require('./config/customExpress');
const connection = require('./infra/database/connection');
const tables = require('./infra/database/init_tables');

connection.connect(erro => {
  if (erro)
    console.log('Database connection fail: ', erro);
  else {
    console.log('Database connection successful...');

    tables.init(connection);

    const app = customExpress();
    
    app.listen(3000, () => {
      console.log("Server started...");
    });
  }
});


