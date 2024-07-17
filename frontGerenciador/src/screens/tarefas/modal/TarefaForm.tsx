import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Tarefa } from "../../../models/Tarefa";
import { alterarTarefa, salvarTarefa } from "../../../services/api";

interface TarefaFormProps {
    tarefa: Tarefa | null;
    onClose: () => void;
}

const TarefaForm: React.FC<TarefaFormProps> = ({ tarefa, onClose }) => {
    const [formData, setFormData] = useState<Omit<Tarefa, 'codigo' | 'data_alteracao'>>({
        disciplina: '',
        disciplinaId: 0,
        situacao: '',
        descricao: '',
        data_prevista: new Date(),
        data_registro: new Date()
    });

    useEffect(() => {
        if (tarefa) {
            setFormData({
                disciplina: tarefa.disciplina,
                disciplinaId: tarefa.disciplinaId,
                situacao: tarefa.situacao,
                descricao: tarefa.descricao,
                data_prevista: tarefa.data_prevista instanceof Date 
                ? tarefa.data_prevista 
                : new Date(tarefa.data_prevista),
                data_registro: new Date(tarefa.data_registro)
            });
        }
    }, [tarefa]);

    const handleChangeText = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = ev.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeDate = (name: keyof Tarefa, value: Date) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();

        try {
            if (tarefa) {
                await alterarTarefa(tarefa.codigo, formData);
            } else {
                await salvarTarefa(formData);
            }
            onClose();
            window.location.reload(); // Evite recarregar a página, isso pode ser evitado com melhores práticas de React

        } catch (error) {
            console.error('Erro ao salvar tarefa:', error);
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{tarefa ? 'Alterar TAREFA' : 'Cadastrar TAREFA'}</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit}>
                    <ModalBody>
                        <FormControl id="disciplina" mb={5}>
                            <FormLabel>Disciplina</FormLabel>
                            <Input type="text" name="disciplina" value={formData.disciplina} onChange={handleChangeText} required />
                        </FormControl>

                        <FormControl id="situacao" mb={5}>
                            <FormLabel>Situação</FormLabel>
                            <Input type="text" name="situacao" value={formData.situacao} onChange={handleChangeText} required />
                        </FormControl>

                        <FormControl id="descricao" mb={5}>
                            <FormLabel>Descrição</FormLabel>
                            <Input type="text" name="descricao" value={formData.descricao} onChange={handleChangeText} required />
                        </FormControl>

                        <FormControl id="data_prevista" mb={5}>
                            <FormLabel>Data Prevista</FormLabel>
                            <Input type="date" name="data_prevista" value={formData.data_prevista.toISOString().substr(0, 10)} onChange={ev => handleChangeDate('data_prevista', new Date(ev.target.value))} required />
                        </FormControl>

                        {/* Aqui você pode adicionar mais campos conforme necessário */}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} type="submit">
                            {tarefa ? 'Alterar' : 'Cadastrar'}
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default TarefaForm;
