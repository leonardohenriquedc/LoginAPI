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
    console.log(cpf)
    const loginRes = dataBasePost.login(cpf);

    if(loginRes){
        response.status(200).send()
    }
    else{
        response.status(404).send()
    }
})

server.get('/listPersons', () =>{
    return (dataBasePost.listContent())
})

server.put('/uptadeKey/:cpf', (request, response) => {
    return ('metodo updateKey funcinado')
})



server.listen({
    port: 4080
})

