import axios from "axios";
import { Ies } from "../models/Ies";

const api = axios.create({
    baseURL: "http://localhost:3333"
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