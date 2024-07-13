import { Box, Button, ButtonGroup, Flex, Heading, List, ListItem, Text, Tr, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { deletarDisciplina, listarTodasDisciplinas } from "../../services/api";
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import DisciplinaForm from "./modal/DisciplinaForm";
import { Disciplina } from "../../models/disciplina";

const DisciplinaInterface: React.FC = () => {

    const [disciplinaList, setDisciplinaList] = useState<Disciplina[]>([])
    const [disciplinaAtual, setDisciplinaAtual] = useState<Disciplina | null>(null)
    const {isOpen, onOpen, onClose} = useDisclosure();


    useEffect(() =>{

        const fetchData = async () => {
            const response = await listarTodasDisciplinas();
            setDisciplinaList(response.data)

            console.log(response.data)
        }

        fetchData();

    }, [])


    const handleAdd = () =>{
        setDisciplinaAtual(null)
        onOpen()
    }

    const handleDelete = async (codigo: string)=>{
        
        try {

            await deletarDisciplina(codigo)
            setDisciplinaList(disciplinaList.filter(disciplina => disciplina.codigo != codigo))

            alert("Excluido com sucesso !")

        } catch (error) {
            alert("IES Possui ligação com outro tabela, não pode excluir !")
        }
        
    }

    const handleCloseModal=()=>{
        onClose()
        setDisciplinaAtual(null)
    }

    const handleEdit = (disciplina : Disciplina) =>{
        setDisciplinaAtual(disciplina)
        onOpen()
    }

    return (
        <Box p={5} w='100%'>

            <Flex justifyContent={"space-between"}>
                <Heading mb={5}>
                    Tela Disciplinas
                </Heading>
                <Button mb={5} colorScheme="blue"
                onClick={handleAdd}
                 leftIcon={<AddIcon />}   
                >
                    Cadastrar
                </Button>
            </Flex>

            { isOpen && <DisciplinaForm disciplina={disciplinaAtual} onClose={handleCloseModal} />}

            <List spacing={3}>
                { disciplinaList.map(disciplina => (
                    <ListItem key={disciplina.codigo} p={5} shadow='md' borderWidth='1px' borderRadius="md" 
                            as={Flex} justifyContent='space-between'>

                         <Box w={'20%'}>      
                            <Text fontSize="xl">{disciplina.nome}</Text>
                        </Box> 

                        <Box w={'20%'}>      
                            <Text fontSize="xl">{disciplina.professor}</Text>
                        </Box> 

                        <Box w={'20%'}>      
                            <Text fontSize="xl">{disciplina.coordenador}</Text>
                        </Box> 

                        <Box>
                            <Text fontSize="xl">Data Cadastro </Text>
                            <Text>{disciplina.dataCriacao.toLocaleString()}</Text>
                        </Box>
                        
                        <ButtonGroup>
                            <Button colorScheme="blue"  mr={2} leftIcon={<EditIcon/>}
                                onClick={() => handleEdit(disciplina)}>Alterar</Button>
                                
                            <Button colorScheme="red"  leftIcon={<DeleteIcon/>}
                            onClick={() =>  handleDelete(disciplina.codigo)}>Deletar</Button>
                        </ButtonGroup>
                    </ListItem>
                ))}
            </List>


        </Box>
    )
    
}

export default DisciplinaInterface;