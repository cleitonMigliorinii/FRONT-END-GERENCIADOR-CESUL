import axios from "axios";
import { Turma } from "../models/Turma";
//import { Ies } from "../models/Ies";

const api = axios.create({
    baseURL: 'http://localhost:3333'
})

export const listarTodasTurmas = async () => {
    return await api.get<Turma[]>('/listarTodasIes');
}

