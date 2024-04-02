// server.js 
import fastify from 'fastify';

import fastifyCors from 'fastify';

import { DataBaseSql } from './dataBases/dataBaseSql.js';
 
const server = fastify();

const dataBaseSql = new DataBaseSql;

server.post('/create', (request, response) => {
       const {nome, cpf, senha} = request.body;
        try {
            if(!nome || !cpf || !senha){
                return response.status(401).send(`Verificar formularios`)
            }
            dataBaseSql.create({
                nome,
                cpf, 
                senha
               })
            response.status(201).send()
        }
        catch (error) {
            console.log(error);
            response.status(500).send();
        }
})

server.post('/login', async (request, response) => {
    response.header(Access-Control-Allow-Origin, '*')

    const { cpf, senha } = request.body;
    console.log(cpf, senha)
    const loginRes = await dataBaseSql.validacionlogin(cpf, senha);
    const conLogin = JSON.parse(loginRes);
    if(conLogin.cpf === cpf){
        response.send(JSON.stringify(conLogin));
        console.log(conLogin)
    }
    else{
        response.send('ta tentando fazer oq safado')
    }
})

server.get('/listPersons', () =>{
    return (dataBaseSql.listContent());
})

server.put('/uptadeKey', (request, response) => {
    const cpf = request.query.search;
    const senha = request.body;
    console.log(senha);
    const value = dataBaseSql.updateData(cpf, senha);
    console.log(value);
})

server.addHook('onRequest', (req, res, done) => {
    // Configuração do cabeçalho CORS para permitir solicitações de qualquer origem
    res.header('Access-Control-Allow-Origin', '*'); // Permite solicitações de qualquer origem
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos permitidos
    res.header('Access-Control-Allow-Headers', 'Content-Type'); // Cabeçalhos permitidos
    
    // Continue para a próxima etapa de manipulação de solicitação
    done();
  });

  server.options('*', async (request, response) => {
    // Adicione os cabeçalhos CORS necessários para responder à solicitação preflight
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    response.status(200).send();
  });

server.listen({
    port: 4070
});

  