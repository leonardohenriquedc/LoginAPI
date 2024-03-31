// server.js 
import fastify from 'fastify';

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

server.get('/login', async (request, response) => {
    const {cpf, senha } = request.body
    const loginRes = await dataBaseSql.validacionlogin(cpf, senha);
    response.send(loginRes)
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