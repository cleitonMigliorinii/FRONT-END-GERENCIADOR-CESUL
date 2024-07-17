import { useEffect, useState } from "react";
import { DisciplinaAluno } from "../../../../models/DisciplinaAluno";
import { Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Text } from "@chakra-ui/react";
import { alterarDisciplinaAluno, salvarDisciplinaAluno } from "../../../../services/api";

interface DisciplinaAlunoFormProps {
    disciplinaAluno: DisciplinaAluno | null
    onClose: () => void
    disciplinas: {codigo: string, nome: string}[]
}

const DisciplinaAlunoForm: React.FC<DisciplinaAlunoFormProps> = ({disciplinaAluno, onClose, disciplinas}) => {
    const [formData, setFormData] = useState<Omit<DisciplinaAluno, 'codigo'>>({
        codigoAluno: '',
        usuario: {
            nomeUsuario: '',
            emailUsuario: ''
          },
        disciplina: {
            codigo: '',
            nome: ''
          },
        codigoDisciplina: '',
        dataRegistro: new Date(),
        situacao: '' 
    })

    useEffect(() => {
        if (disciplinaAluno) {
            setFormData({
                codigoAluno: disciplinaAluno.codigoAluno,
                usuario: disciplinaAluno.usuario,
                disciplina: disciplinaAluno.disciplina,
                codigoDisciplina: disciplinaAluno.codigoDisciplina,
                dataRegistro: disciplinaAluno.dataRegistro,
                situacao: disciplinaAluno.situacao
            });
        }
    }, [disciplinaAluno]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({
            ...formData,
            disciplina: disciplinas.find(d => d.codigo === e.target.value) || formData.disciplina,
            codigoDisciplina: e.target.value
        });
    };

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault()
        try{
            if(disciplinaAluno){
                await alterarDisciplinaAluno(disciplinaAluno.codigo, formData)
            }else{
                await salvarDisciplinaAluno(formData)
            }
            onClose()
            window.location.reload()
        }catch(error){
        }
    }

    return (
        <Modal isOpen={true} onClose={onClose}>
            <ModalOverlay>
                <ModalContent>
                    <ModalHeader>{disciplinaAluno ? 'Alteração de situação' : 'Novo cadastro'}</ModalHeader>
                    <ModalCloseButton/>
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <FormControl mb={5}><Text>RA {disciplinaAluno?.codigoAluno}</Text></FormControl>
                            <FormControl  mb={5}>
                                {disciplinaAluno ? 
                                    null : 
                                    <>
                                        <FormLabel>Disciplina</FormLabel>
                                        <Select 
                                            variant='filled' 
                                            placeholder='Selecione a disciplina' 
                                            onChange={handleSelectChange}
                                        >
                                            {disciplinas.map(d => (
                                                <option key={d.codigo} value={d.codigo}>
                                                    {d.nome}
                                                </option>
                                            ))}
                                        </Select>
                                    </>
                                }
                            </FormControl>
                            <FormControl  mb={5}>
                                <FormLabel>Situação</FormLabel>
                                <Stack>
                                    <Select variant='filled' placeholder='Situação'>
                                        <option value='option 1'>Cursando</option>
                                        <option value='option 1'>Aprovado</option>
                                        <option value='option 1'>Reprovado</option>
                                        <option value='option 1'>Bloqueado</option>
                                    </Select>
                                </Stack>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} type="submit">
                                {disciplinaAluno ? 'Alterar' : 'Cadastrar'}
                            </Button>
                            <Button onClick={onClose}>
                                Cancelar
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    )
}

export default DisciplinaAlunoForm