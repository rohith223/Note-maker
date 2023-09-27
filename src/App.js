import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Signup from './components/Register';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import NoteMaker from './components/Home';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      
      <Route path='/' element={<Login />}/>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/home' element={<NoteMaker />}/>
    
    </Routes>
    </BrowserRouter>
  );
}


export default App;
