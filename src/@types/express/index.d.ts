// adicionando uma propriedade a mais no tipo Request do express
declare namespace Express{
    export interface Request{
        user_id: string;
    }
}