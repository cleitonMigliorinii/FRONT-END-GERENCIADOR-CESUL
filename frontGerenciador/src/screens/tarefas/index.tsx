import { Box, Button, ButtonGroup, Flex, Heading, List, ListItem, Text, Tr, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Tarefa } from "../../models/Tarefa";
import TarefaForm from "./modal/TarefaForm";
import { deletarTarefa, listarTodasTarefas } from "../../services/api";


const TarefaInterface: React.FC = () => {

    const [tarefaList, setTarefaList] = useState<Tarefa[]>([])
    const [tarefaAtual, setTarefaAtual] = useState<Tarefa | null>(null)
    const { isOpen, onOpen, onClose } = useDisclosure();


    useEffect(() => {

        const fetchData = async () => {
            const response = await listarTodasTarefas();
            setTarefaList(response.data)
        }

        fetchData();

    }, [])


    const handleAdd = () => {
        setTarefaAtual(null)
        onOpen()
    }

    const handleDelete = async (codigo: string) => {

        try {

            await deletarTarefa(codigo)
            setTarefaList(tarefaList.filter(tarefa => tarefa.codigo != codigo))

            alert("Excluido com sucesso !")

        } catch (error) {
            alert("IES Possui ligação com outro tabela, não pode excluir !")
        }

    }

    const handleCloseModal = () => {
        onClose()
        setTarefaAtual(null)
    }

    const handleEdit = (ies: Tarefa) => {
        setTarefaAtual(ies)
        onOpen()
    }

    return (
        <Box p={5} w='100%'>

            <Flex justifyContent={"space-between"}>
                <Heading mb={5}>
                    Tela Tarefas
                </Heading>
                <Button mb={5} colorScheme="blue"
                    onClick={handleAdd}
                    leftIcon={<AddIcon />}
                >
                    Cadastrar
                </Button>
            </Flex>

            {isOpen && <TarefaForm tarefa={tarefaAtual} onClose={handleCloseModal} />}

            <List spacing={3}>
                {tarefaList.map(tarefa => (
                    <ListItem key={tarefa.codigo} p={5} shadow='md' borderWidth='1px' borderRadius="md"
                        as={Flex} justifyContent='space-between'>

                        <Box w={'40%'}>
                            <Text fontSize="xl">{tarefa.disciplina}</Text>
                            <Text>Descrição : {tarefa.descricao}</Text>
                        </Box>

                        <Box>
                            <Text fontSize="xl">Data Cadastro </Text>
                            <Text>{tarefa.data_registro.toLocaleString()}</Text>
                        </Box>
                        <Box>
                            <Text fontSize="xl"> Situação</Text>
                            <Text>{tarefa.situacao}</Text>
                        </Box>

                        <ButtonGroup>
                            <Button colorScheme="blue" mr={2} leftIcon={<EditIcon />}
                                onClick={() => handleEdit(tarefa)}>Alterar</Button>

                            <Button colorScheme="red" leftIcon={<DeleteIcon />}
                                onClick={() => handleDelete(tarefa.codigo)}>Deletar</Button>
                        </ButtonGroup>
                    </ListItem>
                ))}
            </List>


        </Box>
    )

}

export default TarefaInterface;
