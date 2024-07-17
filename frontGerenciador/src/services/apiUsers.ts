import axios from "axios";
import { Usuario } from "../models/Usuarios";
import { Turma } from "../models/Turma";

const api = axios.create({
    baseURL: 'http://localhost:3333'
})

export const listarTodosUsuarios = async () => {
    return await api.get<Usuario[]>('/list/users');
}

export const salvarUsuario = async (data : Omit<Usuario, 'codigo'>) => {
    return await api.post('/salvarUsuario', data)
}

export const alterarUsuario = async (codigo: string, data: Omit<Usuario, 'codigo'>) => {
    return await api.put(`/alterarUsuario/${codigo}`, data)
}

export const deletarUsuario = async (codigo: string) => {
    return await api.delete(`/deletarUsuario/${codigo}`);
}

export const buscarUsuarioRA = async (ra: string) => {
    return await api.get<Usuario>(`/buscarUsuario/${ra}`)
}

export const listarTodasTurma = async () => {
    return await api.get<Turma[]>('/buscarTurma');
}