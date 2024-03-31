import mysql from 'mysql';


const { MYSQL_HOST, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, MYSQL_PORT} = process.env;

const connection = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    port: MYSQL_PORT
})

// Conecta ao banco de dados
connection.connect((error) => {
    if (error) {
        console.error('Erro ao conectar ao banco de dados MySQL:', error);
        return;
    }
    console.log('Conexão bem-sucedida com o banco de dados MySQL!');
});

export const sql = connection