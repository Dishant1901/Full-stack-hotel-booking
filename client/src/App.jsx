import {Route, Routes} from 'react-router-dom'
import IndexPage from './pages/indexPage';
import LoginPage from './pages/LoginPage';
import Layout from './layout/Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './Context/UserContext';
import AccountPage from './pages/AccountPage';

axios.defaults.baseURL='http://localhost:4141'
axios.defaults.withCredentials=true

function App() {
  return (
    <UserContextProvider>

    <Routes>
      <Route path='/' element={<Layout/>} >
        <Route index element ={<IndexPage/>} />
        <Route path='/login' element ={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>}/>
        {/* <Route path='/account' element={<AccountPage/>} /> */}
        <Route path='/account/:subpage?' element={<AccountPage/>} />
        <Route path='/account/:subpage/:action' element={<AccountPage/>} />
      </Route>
    </Routes>
    </UserContextProvider>
    
   
  );
}

export default App;
