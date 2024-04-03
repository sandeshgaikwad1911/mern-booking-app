import './App.css'
import { Route, BrowserRouter, Routes, Navigate} from 'react-router-dom';
import Layout from './layout/Layout';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import { useEffect, useState} from 'react';
import AddHotel from './pages/AddHotel';

function App() {

  const [isAuthToken, setIsAuthToken] = useState<null | string>(null);
  // console.log("isAuthToken App.tsx", isAuthToken) ;
    
  useEffect(()=>{
    const  token = localStorage.getItem("auth_token");
    if (token) {setIsAuthToken(token)}
  },[isAuthToken]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout><p>hello</p></Layout>}/>
        <Route path='/register' element={<Layout><Register/></Layout>}/>
        <Route path='/sign-in' element={<Layout><SignIn/></Layout>}/>
        {
          isAuthToken &&(
              <Route path='/add-hotel' element={<Layout><AddHotel/></Layout>}/>
          )
        }
        <Route path='*' element={<Navigate to='/sign-in' />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
