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
            if(pessoa.cpf === cpf){
                return true
            }
            else{
                return false
            }
            
        })
       return valueCpf
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
        const pessoas = Array.from(this.#pessoas.entries());
        return this.requestDataBase();
        //return pessoas
    }

    updateData(cpf, senha){
        const obj = this.requestDataBase();
        const objChange = senha;
        let num = 0 
        while(num <= obj.length){
            if(obj[num].cpf != cpf){
                num++
            }
            else{
                obj[num].senha = objChange.senha
                console.log(num)
                return obj[num]
            }
        }
    }
}