export interface Disciplina {
    codigo: string
    nome: string
}

export interface Usuario {
    nomeUsuario: String
    emailUsuario: String
}

export interface DisciplinaAluno{
    codigo:           string  
    codigoAluno:      string
    usuario:          Usuario
    disciplina:       Disciplina
    codigoDisciplina: string
    dataRegistro:     Date
    situacao:         string
}