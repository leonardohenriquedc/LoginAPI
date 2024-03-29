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

    validacionlogin(cpf){ 
        const obj = this.requestDataBase();
        const valueCpf = obj.find(pessoa => {
            pessoa.cpf === cpf
            return true
        })
        
        if(valueCpf){
            return true
        }
        else{
            return false
        }
    }

    requestDataBase(){
        return Array.from(this.#pessoas.entries())
            .map((pessoaArray) => {
                const id = pessoaArray[0];
                const dataPessoa = pessoaArray[1];
                const objPessoa = {
                    id,
                    ...dataPessoa
                }
                return objPessoa
            })
    }

    listContent(){
        const pessoas = Array.from(this.#pessoas.entries())
        return pessoas
    }

    updateData(cpf, senha){
        const obj = this.requestDataBase();
        const valueCpf = obj.findIndex(pessoa => {
           pessoa.cpf === cpf
        })
        console.log(valueCpf)
    }
}