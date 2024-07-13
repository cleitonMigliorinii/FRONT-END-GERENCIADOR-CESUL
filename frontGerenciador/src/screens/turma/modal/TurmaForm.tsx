import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { alterarIes, listarTodasIes, salvarIes } from "../../../services/api";
import { Turma } from "../../../models/Turma";
import { alterarTurma, salvarTurma } from "../../../services/apiTurma";
import { Select } from '@chakra-ui/react'
import { Ies } from "../../../models/Ies";

interface TurmaFormProps {
    turma: Turma | null;
    onClose: () => void
}

const IESSelect = () => {
    const [iesList, setIesList] = useState<Ies[]>([]);
    const [selectedIes, setSelectedIes] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const fetchIes = async () => {
        try {
          const data = await listarTodasIes();
          setIesList(data);
          setLoading(false);
        } catch (error) {
          console.error('Erro ao buscar IES:', error);
          setLoading(false);
        }
      };
  
      fetchIes();
    }, []);
}

const TurmaForm: React.FC<TurmaFormProps> = ({turma, onClose}) => {

    const [formData, setFormData] = useState<Omit<Turma, 'codigo'>>({
        nome : '',
        dataCriacao: new Date(),
        dataInicioPeriodo: new Date(),
        dataFinalPeriodo: new Date(),
        iesCodigo: '',
        usuario: '',
    })

    

    useEffect(() => {
        if(turma){
            setFormData({
                nome : turma.nome,
                dataCriacao: turma.dataCriacao,
                dataInicioPeriodo: turma.dataInicioPeriodo,
                dataFinalPeriodo: turma.dataFinalPeriodo,
                iesCodigo: turma.iesCodigo,
                usuario: turma.usuario,
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

                        <Select placeholder="Selecione uma IES" value={selectedIes} onChange={(e) => setSelectedIes(e.target.value)}>
                        {iesList.map((ies) => (
                            <option key={ies.codigo} value={ies.codigo}>
                            {ies.nome}
                            </option>
                        ))}
                        </Select>

           
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