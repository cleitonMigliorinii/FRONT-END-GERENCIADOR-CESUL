import { Turma } from "./Turma"
import { NotasTarefas } from "./NotasTarefas"
import { DisciplinaAluno } from "./DisciplinaAluno"

export interface Usuario {
    RA: string;
    nomeUsuario: string;
    senhaUsuario: string;
    emailUsuario: string;
    telefoneUsuario: string;
    tipoUsuario: string;
    situacaoUsuario: Boolean;
    dataAlteracaoUsuario?: Date;
    notasTarefas: NotasTarefas[];
    disciplinaAluno: DisciplinaAluno[];
    turma: Turma
}