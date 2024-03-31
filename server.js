// server.js 
import fastify from 'fastify';

import { DataBaseSql } from './dataBases/dataBaseSql.js';

const server = fastify();

const dataBaseSql = new DataBaseSql;

server.post('/create', (request, response) => {
       const {nome, cpf, senha} = request.body;

       dataBaseSql.create({
        nome,
        cpf, 
        senha
       })

       response.status(201).send()
})

server.get('/login/:cpf', (request, response) => {
    const cpf = request.params.cpf;
    const loginRes = dataBaseSql.validacionlogin(cpf);
    if(loginRes){
        response.send('Foi encontrado');
    }
    else{
        response.send('Não foi encontrado');
    }
    console.log(typeof(cpf), cpf)
})

server.get('/listPersons', () =>{
    return (dataBaseSql.listContent());
})

server.put('/uptadeKey', (request, response) => {
    const cpf = request.query.search;
    const senha = request.body;
    const value = dataBaseSql.updateData(cpf, senha);
    console.log(value);
})


server.listen({
    port: 4070
})