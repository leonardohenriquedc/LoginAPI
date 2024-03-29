// server.js 

import fastify from 'fastify';

import { DataBasePost } from './dataBases/dataBaseInicial.js';

const server = fastify();

const dataBasePost = new DataBasePost;

server.post('/create', (request, response) => {
       const {nome, cpf, senha} = request.body;

       dataBasePost.create({
        nome,
        cpf, 
        senha
       })

       response.status(201).send()
})

server.get('/login/:cpf', (request, response) => {
    const cpf = request.params.cpf
    const loginRes = dataBasePost.validacionlogin(cpf);
    if(loginRes){
        response.send('Foi encontrado')
    }
    else{
        response.send('Não foi encontrado')
    }
    console.log(typeof(cpf), cpf)
}) 

server.get('/listPersons', () =>{
    return (dataBasePost.listContent())
})

server.put('/uptadeKey', (request, response) => {
    const cpf = request.query.search;
    const senha = request.body
    const value = dataBasePost.updateData(cpf, senha);
    console.log(value)
})



server.listen({
    port: 4070
})