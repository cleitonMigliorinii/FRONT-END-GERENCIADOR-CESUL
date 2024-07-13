import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { alterarDisciplina, salvarDisciplina } from "../../../services/api";
import { Disciplina } from "../../../models/disciplina";

interface DisciplinaFormProps {
    disciplina: Disciplina | null;
    onClose: () => void
}

const DisciplinaForm: React.FC<DisciplinaFormProps> = ({disciplina, onClose}) => {

    const [formData, setFormData] = useState<Omit<Disciplina, 'codigo'>>({
        nome : '',
        professor : '',
        coordenador : '',
        dataCriacao: new Date()
    })

    useEffect(() => {
        if(disciplina){
            setFormData({
                nome : disciplina.nome,
                professor : disciplina.professor,
                coordenador : disciplina.coordenador,
                dataCriacao: disciplina.dataCriacao
            })
        }
    }, [disciplina])

    const handleChangeText = (ev: React.ChangeEvent<HTMLInputElement>) =>{

        const {name, value} = ev.target;

        setFormData({...formData, [name]: value})
    }


    const handleSubmit = async (ev: React.FormEvent) => {
    
        ev.preventDefault()

        try{

            if(disciplina){
                await alterarDisciplina(disciplina.codigo, formData)
            }else{
                await salvarDisciplina(formData)
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

                <ModalHeader>{disciplina ? 'Alterar Disciplina' : 'Cadastrar Disciplina'}</ModalHeader>
                
                <ModalCloseButton/>

                <form onSubmit={handleSubmit}>

                    <ModalBody>

                        <FormControl id="nome" mb={5}>
                            <FormLabel>Nome</FormLabel>
                            <Input type="text" name="nome" value={formData.nome} onChange={handleChangeText} required/>
                        </FormControl>

                        <FormControl id="professor" mb={5}>
                            <FormLabel>Professor</FormLabel>
                            <Input type="text" name="professor" value={formData.professor} onChange={handleChangeText} required/>
                        </FormControl>

                        <FormControl id="coordenador" mb={5}>
                            <FormLabel>Coordenador</FormLabel>
                            <Input type="text" name="coordenador" value={formData.coordenador} onChange={handleChangeText} required/>
                        </FormControl>
           
           
                    </ModalBody>

                    <ModalFooter>

                        <Button colorScheme="blue" mr={3} type="submit">
                            {disciplina ? 'Alterar': 'Cadastrar'}
                        </Button>

                        <Button onClick={onClose}>Cancelar</Button>

                    </ModalFooter>

                </form>

            </ModalContent>

        </Modal>


    )
}

export default DisciplinaForm;