import millify from "millify"
import Pagination from '@material-ui/lab/Pagination';
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState,useEffect,useRef,useCallback } from "react";
import Filter from './Filter'


export const Countries=({countries})=>{
    const [value, setValue] = useState("");
    const [region, setRegion] = useState("");
    const navigate= useNavigate()
    const[page,setPage]=useState(1)
    const scroll=useRef()
    const pages=Math.floor(countries.length/16)+1
    console.log(pages)
    console.log(countries.length/16)
    const[countriess,setCountriess]=useState()

   
const setpages=(event, value)=>{
    console.log(value)
    setPage(value);
    scroll.current.scrollIntoView('smooth')
}
useEffect(() => {
    setPage(1);
  }, [region, value]);

  useEffect(() => {
    let showCountries = countries;
    console.log(countriess)
    console.log(countries)
    console.log(showCountries)
    if (region !== "") {
      showCountries = showCountries.filter(
        (country) => country.region === region
      );
    }
    if (value.trim() !== "") {
      showCountries = showCountries.filter((country) => {
        return (
          country.name.toUpperCase().includes(value.toUpperCase()) ||
          country.region.toUpperCase().startsWith(value.toUpperCase()) ||
          (country.capital
            ? country.capital.toUpperCase().startsWith(value.toUpperCase())
            : false) ||
          country.nativeName.toUpperCase().includes(value.toUpperCase())
        );
      });
    }
    setCountriess(showCountries.slice((page-1)*16,(page)*16))
  }, [countries, region, value]);
  useEffect(()=>{
    setCountriess(countries?.slice((page-1)*16,(page)*16))
    console.log(countriess)
    },[countries,page])
    return(
<>
{value}
<Filter value={value} setValue={setValue} region={region} setRegion={setRegion}/>
<div ref={scroll} className="grid scroll-smooth sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 mt-5 gap-10 xl:gap-16">
{countriess?.map((c,index)=><>

<div className="bg-#fafafa m-4" onClick={()=>navigate(`/countrydetail/${c.alpha3Code}`)} >
    <div>
<img className="w-full h-40 object-cover" src={c.flag} alt=''/>
</div>
<div className="font-medium text-base px-4 py-5">
<p className="text-lg font-semibold" >{c.name}</p>
<p className="mt-2">Population :<span className='font-light opacity-80'>
{millify(c.population)}</span>
</p>
<p>Region : <span className="font-light opacity-80">{c.region}</span></p>
        <p>Capital : <span className="font-light opacity-80">{c.capital}</span></p>
        </div>
</div>

</>)}
</div>
<div className="flex justify-center py-2">
<Pagination count={pages} shape="rounded" variant="outlined" onChange={setpages}/>
</div>

</>
    )
}
export default Countries