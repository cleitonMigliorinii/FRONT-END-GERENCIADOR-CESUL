import { Turma } from "./Turma"

export interface Usuario {
    RA: string;
    nomeUsuario: string;
    senhaUsuario: string;
    emailUsuario: string;
    telefoneUsuario: string;
    tipoUsuario: string;
    situacaoUsuario: Boolean;
    dataAlteracaoUsuario?: Date;
    //turma: string
}