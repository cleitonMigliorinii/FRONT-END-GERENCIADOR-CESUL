import { Box, Button, ButtonGroup, Flex, Heading, List, ListItem, Text, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { DisciplinaAluno } from "../../../models/DisciplinaAluno"
import { deletarDisciplinaAluno, listarDisciplinaAluno, listarDisciplinas } from "../../../services/api"
import DisciplinaAlunoForm from "./modal/DisciplinaAlunoForm"
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"

const DisciplinaAlunoPorAlunoInterface: React.FC = () => {
    const [disciplinaAlunoList, setDisciplinaAlunoList] = useState<DisciplinaAluno[]>([])
    const [codigoAluno, setCodigoAluno] = useState('2022024080')
    const [disciplinaAlunoAtual, setDisciplinaAlunoAtual] = useState<DisciplinaAluno | null>(null)
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [selectedDisciplinaAluno, setSelectedDisciplinaAluno] = useState<DisciplinaAluno | null>(null);
    const [disciplinasList, setDisciplinasList] = useState<{ codigo: string, nome: string }[]>([]);
    
    useEffect (() =>{
        const fetchData = async () =>{
            const response = await listarDisciplinaAluno(codigoAluno)
            setDisciplinaAlunoList(response.data)
        }

        const fetchDisciplinas = async () => {
            try {
                const response = await listarDisciplinas();
                setDisciplinasList(response.data);
            } catch (error) {
                console.error("Erro ao listar disciplinas:", error);
            }

            }
        
        fetchData();
        fetchDisciplinas();
    }, [codigoAluno])

    

    const handleAdd = () =>{
        setDisciplinaAlunoAtual(null)
        onOpen()
    }

    const handleCloseModal=()=>{
        onClose()
        setDisciplinaAlunoAtual(null)
        setSelectedDisciplinaAluno(null);
    }

    const handleEdit = (disciplinaAluno : DisciplinaAluno) =>{
        setDisciplinaAlunoAtual(disciplinaAluno)
        onOpen()
    }

    const handleDelete = async (codigo: string)=>{
        
        try {

            await deletarDisciplinaAluno(codigo)
            setDisciplinaAlunoList(disciplinaAlunoList.filter(disciplinaAluno => disciplinaAluno.codigo != codigo))

            alert("Excluido com sucesso!")

        } catch (error) {
            alert("O vinculo de aluno com disciplina possui ligação com outro tabela, não pode excluir!")
        }
        
    }

    return (
        <Box p={5} w='100%'>
            <Flex justifyContent={"space-between"}>
                <Heading mb={5}>Disciplinas por Aluno</Heading>
                <Button onClick={handleAdd} mb={5} colorScheme="blue" leftIcon={<AddIcon/>}>Novo Cadastro</Button>
            </Flex>
            { isOpen && <DisciplinaAlunoForm disciplinaAluno={disciplinaAlunoAtual} onClose={handleCloseModal} disciplinas={disciplinasList}/>}
            <List>
                {disciplinaAlunoList.map(disciplinaAluno => (
                    <ListItem key={disciplinaAluno.codigoDisciplina} p={5} shadow='md' borderWidth='1px' borderRadius="md" 
                    as={Flex} justifyContent='space-between'>
                        <Box w={'40%'}>
                            <Text>{disciplinaAluno.codigoDisciplina}</Text>
                            <Text>{disciplinaAluno.disciplina.nome}</Text>
                        </Box>
                        <Box>
                            <Text fontSize="xl">{disciplinaAluno.situacao}</Text>
                        </Box>
                        <Box>
                            <Text fontSize="xl">Data de registro</Text>
                            <Text>{disciplinaAluno.dataRegistro.toLocaleString()}</Text>
                        </Box>
                        <ButtonGroup>
                            <Button colorScheme="blue"  mr={2} leftIcon={<EditIcon/>} onClick={() => handleEdit(disciplinaAluno)}>Alterar</Button>
                            <Button colorScheme="red"  leftIcon={<DeleteIcon/>} onClick={() => handleDelete(disciplinaAluno.codigo)}>Deletar</Button>
                        </ButtonGroup>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default DisciplinaAlunoPorAlunoInterface