import logo from './logo.svg';
import './App.css';
import Cryptolist from './components/Cryptolist';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Cryptodetails from './components/Cryptodetails'
import { useState,useEffect } from 'react';
import Countries from './countries/countries'
import Countrydetail from './countries/countrydetail'

function App() {
  const [countries, setCountries] = useState([]);
  const [theme, setTheme] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fetchData = async () => {
    try {
      setError(false);
      setLoading(true);
      let response = await fetch("https://restcountries.com/v2/all");
      console.log(response)
      let countries = await response.json();
      console.log(countries)
      countries = countries.filter((elem) => elem.name !== "Israel");

      setCountries(countries);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    fetchData();
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme") === "false" ? false : true);
    } else {
      localStorage.setItem("theme", false);
    }
  }, []);
  return (
   <>
  
   <BrowserRouter>
   <Routes>
   <Route path='/' element={<Cryptolist/>}/>
     <Route path='/details/:id' element={<Cryptodetails/>}/>
     <Route path='/countries' element={<Countries countries={countries}/>}/>
     <Route path='/countrydetail/:id' element={<Countrydetail countries={countries}/>}/>
   </Routes>
   </BrowserRouter></>
  );
}

export default App;
