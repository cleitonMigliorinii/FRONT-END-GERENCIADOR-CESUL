import { Box, Button, ButtonGroup, Flex, Heading, List, ListItem, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Usuario } from "../../models/Usuarios";
import { Turma } from "../../models/Turma";
import { deletarUsuario, listarTodosUsuarios } from "../../services/apiUsers";
import UsersForm from "./modal/UsersForm";

import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'

const UsersInterface: React.FC = () => {

    const [usuarioList, setUsuarioList] = useState<Usuario[]>([]);
    const [turmaList, setTurmaList] = useState<Turma[]>([]);
    const [UsuarioAtual, setUsuarioAtual] = useState<Usuario | null>(null);
    const [TurmaAtual, setTurmaAtual] = useState<Turma | null>(null);
    const {isOpen, onOpen, onClose} = useDisclosure();


    useEffect(() =>{

        const fetchData = async () => {
            const responseUser = await listarTodosUsuarios();
            const responseTurma = await listarTodasTurma();
            setUsuarioList(responseUser.data)
            setTurmaList(responseTurma.data)

            console.log(responseUser.data)
            console.log(responseTurma.data)
        }

        fetchData();

    }, [])


    const handleAdd = () =>{
        setUsuarioAtual(null)
        setTurmaAtual(null)
        onOpen()
    }

    const handleDelete = async (RA: string)=>{
        
        try {

            await deletarUsuario(RA)
            setUsuarioList(usuarioList.filter(Usuario => Usuario.RA != RA))

            alert("Excluido com sucesso !")

        } catch (error) {
            alert("Usuário possui ligação com outra tabela e não pode ser excluido!")
        }
        
    }

    const handleCloseModal=()=>{
        onClose()
        setUsuarioAtual(null)
    }

    const handleEdit = (Usuario : Usuario) =>{
        setUsuarioAtual(Usuario)
        onOpen()
    }

    return (
        <Box p={5} w='100%'>

            <Flex justifyContent={"space-between"}>
                <Heading mb={5}>
                    Lista de Usuários
                </Heading>
                <Button mb={5} colorScheme="blue"
                onClick={handleAdd}
                 leftIcon={<AddIcon />}   
                >
                    Cadastrar
                </Button>
            </Flex>

            { isOpen && <UsersForm users={UsuarioAtual} turma={TurmaAtual} onClose={handleCloseModal} />}

            <List spacing={3}>
                { usuarioList.map(Usuario => (
                    <ListItem key={Usuario.RA} p={5} shadow='md' borderWidth='1px' borderRadius="md" 
                            as={Flex} justifyContent='space-between'>

                         <Box w={'40%'}>      
                            <Text fontSize="xl">{Usuario.RA}</Text>
                            <Text>CNPJ : {Usuario.nomeUsuario}</Text>
                        </Box> 

                        <Box>
                            <Text fontSize="xl">Data Cadastro </Text>
                            <Text>{Usuario.dataAlteracaoUsuario?.toString()}</Text>
                        </Box>
                        
                        <ButtonGroup>
                            <Button colorScheme="blue"  mr={2} leftIcon={<EditIcon/>}
                                onClick={() => handleEdit(Usuario)}>Alterar</Button>
                                
                            <Button colorScheme="red"  leftIcon={<DeleteIcon/>}
                            onClick={() =>  handleDelete(Usuario.RA)}>Deletar</Button>
                        </ButtonGroup>
                    </ListItem>
                ))}
            </List>


        </Box>
    )
    
}

export default UsersInterface;