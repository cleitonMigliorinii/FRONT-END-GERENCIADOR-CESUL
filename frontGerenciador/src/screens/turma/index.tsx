import { Box, Button, ButtonGroup, Flex, Heading, List, ListItem, Text, Tr, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Turma } from "../../models/Turma";
import { deletarTurma, listarTodasTurma } from "../../services/apiTurma";

const TurmaInterface: React.FC = () => {

    const [turmaList, setTurmaList] = useState<Turma[]>([])
    const [turmaAtual, setTurmaAtual] = useState<Turma | null>(null)
    const {isOpen, onOpen, onClose} = useDisclosure();


    useEffect(() =>{

        const fetchData = async () => {
            const response = await listarTodasTurma();
            setTurmaList(response.data)
        }

        fetchData();

    }, [])


    const handleAdd = () =>{
        setTurmaAtual(null)
        onOpen()
    }

    const handleDelete = async (codigo: string)=>{
        
        try {

            await deletarTurma(codigo)
            setTurmaList(turmaList.filter(turma => turma.codigo != codigo))

            alert("Excluido com sucesso !")

        } catch (error) {
            alert("Turma Possui ligação com outro tabela, não pode excluir !")
        }
        
    }

    const handleCloseModal=()=>{
        onClose()
        setTurmaAtual(null)
    }

    const handleEdit = (turma : Turma) =>{
        setTurmaAtual(turma)
        onOpen()
    }

    return (
        <Box p={5} w='100%'>

            <Flex justifyContent={"space-between"}>
                <Heading mb={5}>
                    Tela Turma
                </Heading>
                <Button mb={5} colorScheme="blue"
                onClick={handleAdd}
                 leftIcon={<AddIcon />}   
                >
                    Cadastrar
                </Button>
            </Flex>

            { isOpen && <TurmaForm ies={turmaAtual} onClose={handleCloseModal} />}

            <List spacing={3}>
                { turmaList.map(turma => (
                    <ListItem key={turma.codigo} p={5} shadow='md' borderWidth='1px' borderRadius="md" 
                            as={Flex} justifyContent='space-between'>

                         <Box w={'40%'}>      
                            <Text fontSize="xl">{turma.nome}</Text>
                            <Text>Codigo : {turma.codigo}</Text>
                        </Box> 

                        <Box>
                            <Text fontSize="xl">Data Cadastro </Text>
                            <Text>{turma.dataCriacao.toLocaleString()}</Text>
                        </Box>
                        
                        <ButtonGroup>
                            <Button colorScheme="blue"  mr={2} leftIcon={<EditIcon/>}
                                onClick={() => handleEdit(turma)}>Alterar</Button>
                                
                            <Button colorScheme="red"  leftIcon={<DeleteIcon/>}
                            onClick={() =>  handleDelete(turma.codigo)}>Deletar</Button>
                        </ButtonGroup>
                    </ListItem>
                ))}
            </List>


        </Box>
    )
    
}

export default TurmaInterface;