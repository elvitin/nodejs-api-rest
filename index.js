const customExpress = require('./config/customExpress');
const conexao = require('./infra/connection');
const tables = require('./infra/init_tables');

conexao.connect(erro => {
  if (erro)
    console.log('Erro na conexão: ', erro);
  else {
    console.log('Conexão realizada!');

    tables.init(conexao);

    const app = customExpress();
    
    app.listen(3000, () => {
      console.log("Servidor iniciou!");
    });
  }
});


