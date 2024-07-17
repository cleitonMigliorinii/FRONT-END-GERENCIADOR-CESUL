import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select } from "@chakra-ui/react";
import { Usuario } from "../../../models/Usuarios"
import { Turma } from "../../../models/Turma";
import { useEffect, useState } from "react";
import { alterarUsuario, listarTodasTurma, salvarUsuario } from "../../../services/apiUsers";

interface UsersFormProps {
    users: Usuario | null;
    turma: Turma;
    onClose: () => void
}

const UsersForm: React.FC<UsersFormProps> = ({ users, turma, onClose }) => {
    const [turmaList, setTurmaList] = useState<Turma[]>([]);

    const [formData, setFormData] = useState<Usuario>({
        RA: '',
        nomeUsuario: '',
        emailUsuario: '',
        senhaUsuario: '',
        telefoneUsuario: '',
        tipoUsuario: '',
        situacaoUsuario: true,
        //turma: turma.nome,
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await listarTodasTurma();
            setTurmaList(response.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (users) {
            setFormData({
                RA: users.RA,
                nomeUsuario: users.nomeUsuario,
                emailUsuario: users.emailUsuario,
                senhaUsuario: users.senhaUsuario,
                telefoneUsuario: users.telefoneUsuario,
                tipoUsuario: users.tipoUsuario,
                situacaoUsuario: users.situacaoUsuario,
                //turma: users.turma,
            });
        }
    }, [users]);

    const handleChangeText = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = ev.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleChangeSelect = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = ev.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();
        try {
            if (users) {
                await alterarUsuario(users.RA, formData);
            } else {
                await salvarUsuario(formData);
            }
            onClose();
            window.location.reload();
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{users ? 'ALTERAR USUÁRIO' : 'CADASTRAR USUÁRIO'}</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit}>
                    <ModalBody>
                        <FormControl id="ra" mb={5}>
                            <FormLabel>RA</FormLabel>
                            <Input type="text" name="RA" value={formData.RA} onChange={handleChangeText} required />
                        </FormControl>
                        <FormControl id="nomeUsuario" mb={5}>
                            <FormLabel>NOME COMPLETO</FormLabel>
                            <Input type="text" name="nomeUsuario" value={formData.nomeUsuario} onChange={handleChangeText} required />
                        </FormControl>
                        <FormControl id="emailUsuario" mb={5}>
                            <FormLabel>E-MAIL</FormLabel>
                            <Input type="email" name="emailUsuario" value={formData.emailUsuario} onChange={handleChangeText} required />
                        </FormControl>
                        <FormControl id="telefoneUsuario" mb={5}>
                            <FormLabel>TELEFONE</FormLabel>
                            <Input type="text" name="telefoneUsuario" value={formData.telefoneUsuario} onChange={handleChangeText} required />
                        </FormControl>
                        <FormControl id="turma" mb={5}>
                            <FormLabel>Turma</FormLabel>
                            <Select name="turma" value={formData.turma} onChange={handleChangeSelect} placeholder='Selecione uma opção'>
                                {turmaList.map((turma) => (
                                    <option key={turma.id} value={turma.nome}>{turma.nome}</option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl id="tipoUsuario" mb={5}>
                            <FormLabel>TIPO</FormLabel>
                            <Input type="text" name="tipoUsuario" value={formData.tipoUsuario} onChange={handleChangeText} required />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} type="submit">
                            {users ? 'Alterar' : 'Cadastrar'}
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default UsersForm;
