import axios from "axios";
import { Ies } from "../models/Ies";
import { Tarefa } from "../models/Tarefa";

const api = axios.create({
    baseURL: 'http://localhost:3333'
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

export const salvarTarefa = async (data : Omit<Tarefa, 'codigo'>) => {
    return await api.post('/tarefas', data)
}

export const alterarTarefa = async (codigo: string, data: Omit<Tarefa, 'codigo'>) => {
    return await api.put(`/tarefas/${codigo}`, data)
}

export const listarTodasTarefas = async () => {
    return await api.get<Tarefa[]>('/tarefas');
}

export const deletarTarefa = async (codigo : string) => {
    return await api.delete(`/tarefas/${codigo}`)
}
