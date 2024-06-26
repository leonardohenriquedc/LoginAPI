// server.js 
import fastify from 'fastify';

import fastifyCors from 'fastify';

import { DataBaseSql } from './dataBases/dataBaseSql.js';
 
const server = fastify();

const dataBaseSql = new DataBaseSql;

server.post('/create', async (request, response) => {
       const {nome, cpf, senha, email} = request.body;
        try {
            if(!nome || !cpf || !senha || !email){
                return response.status(401).send(`Verificar formularios`)
            }
            const value = await dataBaseSql.create({
                nome,
                cpf, 
                senha,
                email
               })
            response.status(201).send(JSON.stringify(value))
        }
        catch (error) {
            console.log(error);
            response.status(500).send();
        }
})

server.post('/login', async (request, response) => {
    const {email, senha} = request.body;
    const loginRes = await dataBaseSql.validationlogin(email, senha);
    const conLogin = JSON.parse(loginRes);
    
    if(conLogin.email === String(email)){
        response.send(JSON.stringify(conLogin));
        console.log(conLogin);
    }
    else{
        response.status(404).send()
    }
})

server.get('/listPersons', async (request, response) =>{
    const lista = await dataBaseSql.listContent();
    response.send(JSON.stringify(lista))
})

server.put('/uptadeKey', async (request, response) => {
    const cpf = request.query.search;
    const senha = request.body;
    await dataBaseSql.updateData(cpf, senha.senha);
    response.status(200).send()
})
//-----------------------------------------------

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

  