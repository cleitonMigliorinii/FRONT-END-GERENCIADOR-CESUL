import React, { useState, useEffect } from 'react';
import { Box, Select, Spinner } from '@chakra-ui/react';
import axios from 'axios';


// Definição do tipo IES
type Ies = {
  codigo: string;
  nome: string;
  dataCriacao: Date;
  cnpj: string;
};

// Função para listar todas as IES (simulação de uma chamada de API)
const listarTodasIes = async () => {
  const response = await axios.get('http://localhost:3333/listarTodasIes'); // Substitua 'URL_DA_API_AQUI' pela URL da sua API
  return response.data;
};

const IESSelect = () => {
  const [iesList, setIesList] = useState<Ies[]>([]);
  const [selectedIes, setSelectedIes] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchIes = async () => {
      try {
        const data = await listarTodasIes();

        console.log('Dados recebidos da API:', data);
        setIesList(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar IES:', error);
        setLoading(false);
      }
    };

    fetchIes();
  }, []);

  return (
    <Box p={5}>
      {loading ? (
        <Spinner />
      ) : (
        <Select placeholder="Selecione uma IES" value={selectedIes} onChange={(e) => setSelectedIes(e.target.value)}>
          {iesList.map((ies) => (
            <option key={ies.codigo} value={ies.codigo}>
              {ies.nome}
            </option>
          ))}
        </Select>
      )}
    </Box>
  );
};

export default IESSelect;