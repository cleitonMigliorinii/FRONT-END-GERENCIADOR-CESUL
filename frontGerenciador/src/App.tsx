import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import IesInterface from './screens/ies'
import { Flex } from '@chakra-ui/react'
import Header from './components/Header'
import DisciplinaInterface from './screens/disciplina'


function App() {

  return (
    <Router>

      <Flex align='center' direction='column'>

          <Header/>

           <Routes>
              <Route path='/ies' element={<IesInterface/>}/>
              <Route path='/disciplina' element={<DisciplinaInterface/>}/>
           </Routes>

      </Flex>

    </Router>
  )
}

export default App
