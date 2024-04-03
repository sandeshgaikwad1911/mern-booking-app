import './App.css'
import { Route, BrowserRouter, Routes, Navigate} from 'react-router-dom';
import Layout from './layout/Layout';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import AddHotel from './pages/AddHotel';
import useAppContext from './hooks/useAppContext';

function App() {

  const {isLoggedIn} = useAppContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout><p>hello</p></Layout>}/>
        <Route path='/register' element={<Layout><Register/></Layout>}/>
        <Route path='/sign-in' element={<Layout><SignIn/></Layout>}/>
        {
          isLoggedIn &&(
              <Route path='/add-hotel' element={<Layout><AddHotel/></Layout>}/>
          )
        }
        <Route path='*' element={<Navigate to='/sign-in' />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
