import logo from './logo.svg';
import './App.css';
import Cryptolist from './components/Cryptolist';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Cryptodetails from './components/Cryptodetails'

function App() {
  return (
   <>
  
   <BrowserRouter>
   <Routes>
   <Route path='/' element={<Cryptolist/>}/>
     <Route path='/details/:id' element={<Cryptodetails/>}/>
   </Routes>
   </BrowserRouter></>
  );
}

export default App;
