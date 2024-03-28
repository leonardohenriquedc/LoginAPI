import { randomUUID } from 'node:crypto';
 
 
 export class DataBasePost{
    #pessoas = new Map();

    create(cadPessoa){
        const id = randomUUID()

        this.#pessoas.set(id, cadPessoa);

        return true
    }

    delete(cpf){
        this.#pessoas.delete(cpf);
    }

    login(cpf){
       return Array.from(this.#pessoas.entries())
            .map((pessoaArray) => {
                const id = pessoaArray[0];
                const dataPessoa = pessoaArray[1];
                const objPessoa = {
                    id,
                    ...dataPessoa
                }
            })
            .filter(objPessoa => {
                   if(objPessoa.cpf.includes(cpf)){
                    return true
                   }
                   else{
                    return false
                   }
            })
        
    }

    listContent(){
        const pessoas = Array.from(this.#pessoas.entries())
       return pessoas
    }
}