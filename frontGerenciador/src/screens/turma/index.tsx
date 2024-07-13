import { Box, Button, ButtonGroup, Flex, Heading, List, ListItem, Text, Tr, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Ies } from "../../models/Ies";
import { deletarIes, listarTodasIes } from "../../services/api";
import TurmaForm from "./modal/TurmaForm";

import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'

const TurmaInterface: React.FC = () => {

    const [iesList, setIesList] = useState<Ies[]>([])
    const [iesAtual, setIesAtual] = useState<Ies | null>(null)
    const {isOpen, onOpen, onClose} = useDisclosure();


    useEffect(() =>{

        const fetchData = async () => {
            const response = await listarTodasIes();
            setIesList(response.data)
        }

        fetchData();

    }, [])


    const handleAdd = () =>{
        setIesAtual(null)
        onOpen()
    }

    const handleDelete = async (codigo: string)=>{
        
        try {

            await deletarIes(codigo)
            setIesList(iesList.filter(ies => ies.codigo != codigo))

            alert("Excluido com sucesso !")

        } catch (error) {
            alert("IES Possui ligação com outro tabela, não pode excluir !")
        }
        
    }

    const handleCloseModal=()=>{
        onClose()
        setIesAtual(null)
    }

    const handleEdit = (ies : Ies) =>{
        setIesAtual(ies)
        onOpen()
    }

    return (
        <Box p={5} w='100%'>

            <Flex justifyContent={"space-between"}>
                <Heading mb={5}>
                    Tela IES
                </Heading>
                <Button mb={5} colorScheme="blue"
                onClick={handleAdd}
                 leftIcon={<AddIcon />}   
                >
                    Cadastrar
                </Button>
            </Flex>

            { isOpen && <IesForm ies={iesAtual} onClose={handleCloseModal} />}

            <List spacing={3}>
                { iesList.map(ies => (
                    <ListItem key={ies.codigo} p={5} shadow='md' borderWidth='1px' borderRadius="md" 
                            as={Flex} justifyContent='space-between'>

                         <Box w={'40%'}>      
                            <Text fontSize="xl">{ies.nome}</Text>
                            <Text>CNPJ : {ies.cnpj}</Text>
                        </Box> 

                        <Box>
                            <Text fontSize="xl">Data Cadastro </Text>
                            <Text>{ies.dataCriacao.toLocaleString()}</Text>
                        </Box>
                        
                        <ButtonGroup>
                            <Button colorScheme="blue"  mr={2} leftIcon={<EditIcon/>}
                                onClick={() => handleEdit(ies)}>Alterar</Button>
                                
                            <Button colorScheme="red"  leftIcon={<DeleteIcon/>}
                            onClick={() =>  handleDelete(ies.codigo)}>Deletar</Button>
                        </ButtonGroup>
                    </ListItem>
                ))}
            </List>


        </Box>
    )
    
}

export default IesInterface;