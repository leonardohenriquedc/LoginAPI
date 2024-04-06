import { randomUUID } from 'node:crypto';
import { sql } from '.././config/ConnectionSql.js';
 
 export class DataBaseSql{

   async create(cadPessoa){
        const {nome, cpf, senha} = cadPessoa;

        await sql `INSERT INTO pessoa (nome, cpf, senha) VALUES (${String(nome)}, ${Number(cpf)}, ${String(senha)})`;
        return await sql `SELECT * FROM pessoa WHERE cpf = ${Number(cpf)};`;
    }

   async delete(cpf){
        await sql `delete from pessoa where ${Number(cpf)}`
   }

   async validationData(cpf, senha){
      //cpf.replace(/[^\w\s]/gi, '');
      if(cpf.length <= 11 && senha !== null || senha !== ''){
         return true;
     } else {
         return false;
     }
   }

   async validacionlogin(cpf, senha){
     
      const validado = await this.validationData(cpf, senha);
      if(validado){
         const login = await sql `SELECT * FROM pessoa WHERE senha = ${String(senha)} AND cpf = ${Number(cpf)};`;
         if(login.length != [] && login.length != undefined && login.length != null){
            return JSON.stringify(login[0]);
         }
         else{
            return 404
         }
      }
      else{
         return 'deu merda cria'
      }
   }

   async listContent(){
      return await sql `select * from pessoa`;
    }

   async updateData(cpf, senha){
      const login = await sql `SELECT * FROM pessoa WHERE cpf = ${Number(cpf)};`;
      if(login != []){
         const alterInfo = await sql `UPDATE pessoa SET senha = ${String(senha)} WHERE cpf = ${Number(cpf)}`;
         return await sql `SELECT * FROM pessoa WHERE cpf = ${Number(cpf)};`;
      }
      else{
         return 404
      }
    }
 }