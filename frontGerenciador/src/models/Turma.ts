import { Ies } from "./Ies";

export interface Turma{

    codigo: string;
    nome: string;
    dataCriacao: Date;
    dataInicioPeriodo: Date;
    dataFinalPeriodo: Date;
    ies: Ies;
    iesCodigo: string;
    usuario: string;
}