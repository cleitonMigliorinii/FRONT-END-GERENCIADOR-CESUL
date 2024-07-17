import axios from "axios";
import { Ies } from "../models/Ies";
import { Disciplina, DisciplinaAluno } from "../models/DisciplinaAluno";

const api = axios.create({
    baseURL: 'http://192.168.30.105:3333'
})

export const listarTodasIes = async () => {
    return await api.get<Ies[]>('/listarTodasIes');
}

export const salvarIes = async (data : Omit<Ies, 'codigo'>) => {
    return await api.post('/salvarIes', data)
}

export const alterarIes = async (codigo: string, data: Omit<Ies, 'codigo'>) => {
    return await api.put(`/alterarIes/${codigo}`, data)
}

export const deletarIes = async (codigo: string) => {
    return await api.delete(`/deletarIes/${codigo}`);
}

export const buscarIesCnpj = async (cnpj: string) => {
    return await api.get<Ies>(`/buscarIesCnpj/${cnpj}`)
}

export const listarDisciplinaAluno = async (codigoAluno: string) => {
    return await api.get<DisciplinaAluno[]>(`/listarDisciplinaAluno/${codigoAluno}`)
}

export const salvarDisciplinaAluno = async (data: Omit<DisciplinaAluno, 'codigo'>) => {
    return await api.post('/salvarDisciplinaAluno', data)
}

export const alterarDisciplinaAluno = async (codigo: string, data: Omit<DisciplinaAluno, 'codigo'>) => {
    return await api.put(`/alterarDisciplinaAluno/${codigo}`, data)
}

export const deletarDisciplinaAluno = async (codigo: string) => {
    return await api.delete(`/deletarDisciplinaAluno/${codigo}`)
}

export const buscarDisciplinaAlunoPorAluno = async (codigoAluno: string) => {
    return await api.get<DisciplinaAluno[]>(`/buscarDisciplinaAlunoPorAluno/${codigoAluno}`)
}

export const listarDisciplinas = async () => {
    return await api.get<Disciplina[]>(`/listarTodasDisciplinas`)
}
