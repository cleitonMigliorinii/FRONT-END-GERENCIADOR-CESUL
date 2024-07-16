import { Usuario } from "./Usuarios"
import { Tarefa } from "./Tarefa";

export interface NotasTarefas{

    codigo: string;
    nota:number;
    dataCriacao: Date;
    dataAlteracao: Date;
    tarefa: Tarefa;
    tarefaCodigo:number; 
    usuarioRA:String;
    usuario:Usuario
    
}