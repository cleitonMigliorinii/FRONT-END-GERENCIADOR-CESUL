import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, ButtonGroup, Flex, Heading, List, ListItem, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Usuario } from "../../models/Usuarios";
//import { Turma } from "../../models/Turma";
import { deletarUsuario, listarTodosUsuarios } from "../../services/apiUsers";
import UsersForm from "./modal/UsersForm";

import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'

const UsersInterface: React.FC = () => {

    const [UsuarioList, setUsuarioList] = useState<Usuario[]>([])
    const [UsuarioAtual, setUsuarioAtual] = useState<Usuario | null>(null)
    //const [TurmaAtual, setTurmaAtual] = useState<Turma | null>(null)
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
    const cancelRef = useRef<HTMLButtonElement>(null);
    const [RAParaExcluir, setRAParaExcluir] = useState<string | null>(null);

    useEffect(() => {

        const fetchData = async () => {
            const response = await listarTodosUsuarios();
            setUsuarioList(response.data)
        }

        fetchData();

    }, [])

    const handleAdd = () =>{
        setUsuarioAtual(null)
        onOpen()
    }

    const handleDelete = async () => {
        if (RAParaExcluir) {
            try {
                await deletarUsuario(RAParaExcluir)
                setUsuarioList(UsuarioList.filter(Usuario => Usuario.RA !== RAParaExcluir))
                onAlertClose();
            } catch (error) {
                alert("Usuário possui ligação com outra tabela e não pode ser excluido!")
            }
        }
    };

    const handleDeleteClick = (RA: string) => {
        setRAParaExcluir(RA);
        onAlertOpen();
    };

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

            { isOpen && <UsersForm users={UsuarioAtual} onClose={handleCloseModal} />}

            <List spacing={3}>
                {UsuarioList.map(Usuario => (
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
                            onClick={() =>  handleDeleteClick(Usuario.RA)}>Deletar</Button>
                        </ButtonGroup>
                    </ListItem>
                ))}
            </List>

            <AlertDialog
                isOpen={isAlertOpen}
                leastDestructiveRef={cancelRef}
                onClose={onAlertClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Deletar Usuário
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Você tem certeza? Você não poderá reverter isso!
                        </AlertDialogBody>
                        <AlertDialogFooter justifyContent="center">
                            <Button ref={cancelRef} onClick={onAlertClose}>
                                Não
                            </Button>
                            <Button colorScheme="red" onClick={handleDelete} ml={3}>
                                Sim
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>



        </Box>
    )
    
}

export default UsersInterface;