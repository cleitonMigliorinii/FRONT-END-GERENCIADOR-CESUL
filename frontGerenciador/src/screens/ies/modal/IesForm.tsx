import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { Ies } from "../../../models/Ies"
import { useEffect, useState } from "react";
import { alterarIes, salvarIes } from "../../../services/api";

interface IesFormProps {
    ies: Ies | null;
    onClose: () => void 
}

const IesForm: React.FC<IesFormProps> = ({ies, onClose}) => {

    const [formData, setFormData] = useState<Omit<Ies, 'codigo'>>({
        nome : '',
        cnpj : '',
        dataCriacao: new Date()
    })

    useEffect(() => {
        if(ies){
            setFormData({
                nome : ies.nome,
                cnpj : ies.cnpj,
                dataCriacao: ies.dataCriacao
            })
        }
    }, [ies])

    const handleChangeText = (ev: React.ChangeEvent<HTMLInputElement>) =>{

        const {name, value} = ev.target;

        setFormData({...formData, [name]: value})
    }


    const handleSubmit = async (ev: React.FormEvent) => {
    
        ev.preventDefault()

        try{

            if(ies){
                await alterarIes(ies.codigo, formData)
            }else{
                await salvarIes(formData)
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

                <ModalHeader>{ies ? 'Alterar IES' : 'Cadastrar IES'}</ModalHeader>
                
                <ModalCloseButton/>

                <form onSubmit={handleSubmit}>

                    <ModalBody>

                        <FormControl id="nome" mb={5}>
                            <FormLabel>Nome Ies</FormLabel>
                            <Input type="text" name="nome" value={formData.nome} onChange={handleChangeText} required/>
                        </FormControl>

                        <FormControl id="cnpj" mb={5}>
                            <FormLabel>CNPJ Ies</FormLabel>
                            <Input type="text" name="cnpj" value={formData.cnpj} onChange={handleChangeText} required/>
                        </FormControl>
           
                    </ModalBody>

                    <ModalFooter>

                        <Button colorScheme="blue" mr={3} type="submit">
                            {ies ? 'Alterar': 'Cadastrar'}
                        </Button>

                        <Button onClick={onClose}>Cancelar</Button>

                    </ModalFooter>

                </form>

            </ModalContent>

        </Modal>


    )




}

export default IesForm;