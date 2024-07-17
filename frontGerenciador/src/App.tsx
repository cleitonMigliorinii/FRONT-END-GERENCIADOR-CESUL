import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import IesInterface from './screens/ies'
import { Flex } from '@chakra-ui/react'
import Header from './components/Header'
import DisciplinaAlunoPorAlunoInterface from './screens/disciplinaAluno/aluno'


function App() {

  return (
    <Router>

      <Flex align='center' direction='column'>

          <Header/>

           <Routes>
              <Route path='/ies' element={<IesInterface/>}/>
              <Route path='/diciplinaAluno' element={<DisciplinaAlunoPorAlunoInterface/>}/>
           </Routes>

      </Flex>

    </Router>
  )
}

export default App
