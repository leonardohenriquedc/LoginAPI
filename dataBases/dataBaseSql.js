import { randomUUID } from 'node:crypto';
import { sql } from '.././config/ConnectionSql.js';
 
 export class DataBaseSql{

   async create(cadPessoa){
        const {nome, cpf, senha} = cadPessoa;

        await sql `insert into pessoa (nome, cpf, senha) values (${nome}, ${cpf}, ${senha})`;
        return 201
    }

   async delete(cpf){
        await sql `delete from pessoa where ${Number(cpf)}`
   }

   validationData(cpf, senha){
      if(cpf.lenght == 11 && senha != null && senha != ''){
         return true
      }
      else{
         return false
      }
   }

   async validacionlogin(cpf, senha){
      cpf.replace(/[^\w\s]/gi, '');
      const validado = this.validationData(cpf, senha)
      if(validado){
         const login = await sql`SELECT * FROM pessoa WHERE senha =  ${String(senha)} 
            AND cpf::TEXT = ${String(cpf)}`;
         if(login != []){
            return JSON.stringify(login[0]);
         }
         else{
            return 404
         }
      }
   }

   async requestDataBase(){
      return await sql `select cpf from pessoa`;
    }

    listContent(){
       
    }

    updateData(cpf, senha){
        
    }
 }