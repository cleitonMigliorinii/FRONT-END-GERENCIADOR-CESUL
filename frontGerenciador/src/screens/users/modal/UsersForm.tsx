import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { Usuario } from "../../../models/Usuarios"
import { Turma } from "../../../models/Turma";
import { useEffect, useState } from "react";
import { alterarUsuario, salvarUsuario } from "../../../services/apiUsers";

interface UsuarioFormProps {
    users: Usuario | null;
    turma: Turma;
    onClose: () => void
}

const UsuarioForm: React.FC<UsuarioFormProps> = ({users, turma, onClose}) => {

    const [formData, setFormData] = useState<Usuario>({
        RA : '',
        nomeUsuario : '',
        emailUsuario : '',
        senhaUsuario : '',
        telefoneUsuario : '',
        tipoUsuario : '',
        situacaoUsuario : true,
        disciplinaAluno : [],
        notasTarefas : [],
        turma : turma,
        
    })

    useEffect(() => {
        if(users){
            setFormData({
                RA : users.RA,
                nomeUsuario : users.nomeUsuario,
                emailUsuario : users.emailUsuario,
                senhaUsuario : users.senhaUsuario,
                telefoneUsuario : users.telefoneUsuario,
                tipoUsuario : users.tipoUsuario,
                situacaoUsuario: users.situacaoUsuario,
                disciplinaAluno: users.disciplinaAluno,
                notasTarefas: users.notasTarefas,
                turma: users.turma
            })
        }
    }, [users])

    const handleChangeText = (ev: React.ChangeEvent<HTMLInputElement>) =>{

        const {name, value} = ev.target;

        setFormData({...formData, [name]: value})
    }


    const handleSubmit = async (ev: React.FormEvent) => {
    
        ev.preventDefault()

        try{

            if(users){
                await alterarUsuario(users.RA, formData)
            }else{
                await salvarUsuario(formData)
            }
            onClose()
            window.location.reload()

        }catch(error){

        }

    }


    return (

        <Modal isOpen={true} onClose={onClose}>

            <ModalOverlay/>

            <ModalContent>

                <ModalHeader>{users ? 'Alterar IES' : 'Cadastrar IES'}</ModalHeader>
                
                <ModalCloseButton/>

                <form onSubmit={handleSubmit}>

                    <ModalBody>

                        <FormControl id="nome" mb={5}>
                            <FormLabel>Nome Usuario</FormLabel>
                            <Input type="text" name="nome" value={formData.nomeUsuario} onChange={handleChangeText} required/>
                        </FormControl>

                        <FormControl id="cnpj" mb={5}>
                            <FormLabel>CNPJ Usuario</FormLabel>
                            <Input type="text" name="cnpj" value={formData.emailUsuario} onChange={handleChangeText} required/>
                        </FormControl>
           
                    </ModalBody>

                    <ModalFooter>

                        <Button colorScheme="blue" mr={3} type="submit">
                            {users ? 'Alterar': 'Cadastrar'}
                        </Button>

                        <Button onClick={onClose}>Cancelar</Button>

                    </ModalFooter>

                </form>

            </ModalContent>

        </Modal>


    )




}

export default UsuarioForm;