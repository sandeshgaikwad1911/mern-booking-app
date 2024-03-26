import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout><p>hello</p></Layout>}/>
        <Route path='/register' element={<Layout><Register/></Layout>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
