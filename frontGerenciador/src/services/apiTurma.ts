import axios from "axios";
import { Turma } from "../models/Turma";


const api = axios.create({
    baseURL: "http://localhost:3333"
})

export const listarTodasTurma = async () => {
    return await api.get<Turma[]>('/listarTodasTurmas');
}

export const salvarTurma = async (data : Omit<Turma, 'codigo'>) => {
    return await api.post('/salvarTurma', data)
}

export const alterarTurma = async (codigo: string, data: Omit<Turma, 'codigo'>) => {
    return await api.put(`/alterarTurma/${codigo}`, data)
}

export const deletarTurma = async (codigo: string) => {
    return await api.delete(`/apagarTurma/${codigo}`);
}

export const buscarTurmaCodigo = async (codigo: string) => {
    return await api.get<Turma>(`/buscarTurma/${codigo}`)
}