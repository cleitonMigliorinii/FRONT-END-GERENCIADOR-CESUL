import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Turma } from "../../../models/Turma";
import { alterarTurma, salvarTurma } from "../../../services/apiTurma";
import IESSelect from "../../../components/IESS";

interface TurmaFormProps {
    turma: Turma | null;
    onClose: () => void
}

  // Função para listar todas as IES (simulação de uma chamada de API)
  

const TurmaForm: React.FC<TurmaFormProps> = ({turma, onClose}) => {

    const [formData, setFormData] = useState<Omit<Turma, 'codigo'>>({
        nome : '',
        dataCriacao: new Date(),
        dataInicioPeriodo: new Date(),
        dataFinalPeriodo: new Date(),
        iesCodigo: '',
        
    })

    

    useEffect(() => {
        if(turma){
            setFormData({
                nome : turma.nome,
                dataCriacao: turma.dataCriacao,
                dataInicioPeriodo: turma.dataInicioPeriodo,
                dataFinalPeriodo: turma.dataFinalPeriodo,
                iesCodigo: turma.iesCodigo,
                
            })
        }
    }, [turma])

    

    const handleChangeText = (ev: React.ChangeEvent<HTMLInputElement>) =>{

        const {name, value} = ev.target;

        setFormData({...formData, [name]: value})
    }


    const handleSubmit = async (ev: React.FormEvent) => {
    
        ev.preventDefault()

        try{

            if(turma){
                await alterarTurma(turma.codigo, formData)
            }else{
                await salvarTurma(formData)
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

                <ModalHeader>{turma ? 'Alterar TURMA' : 'Cadastrar TURMA'}</ModalHeader>
                
                <ModalCloseButton/>

                <form onSubmit={handleSubmit}>

                    <ModalBody>

                        <FormControl id="nome" mb={5}>
                            <FormLabel>Nome da turma</FormLabel>
                            <Input type="text" name="nome" value={formData.nome} onChange={handleChangeText} required/>
                        </FormControl>

                        <IESSelect>

                        </IESSelect>
           
                    </ModalBody>

                    <ModalFooter>

                        <Button colorScheme="blue" mr={3} type="submit">
                            {turma ? 'Alterar': 'Cadastrar'}
                        </Button>

                        <Button onClick={onClose}>Cancelar</Button>

                    </ModalFooter>

                </form>

            </ModalContent>

        </Modal>


    )




}

export default TurmaForm;