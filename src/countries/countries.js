import millify from "millify"
import Pagination from '@material-ui/lab/Pagination';
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState,useEffect,useRef,useCallback } from "react";
import Filter from './Filter'
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);


export const Countries=({countries})=>{
  console.log(countries)
    const [value, setValue] = useState("");
    const [region, setRegion] = useState("");
   const[sortby,setSortby]=useState('sortby')
    const countriesbar=countries
    const navigate= useNavigate()
    const[page,setPage]=useState(1)
    const scroll=useRef()
    const pages=Math.floor(countries.length/16)+1
    console.log(pages)
    console.log(countries.length/16)
    const[countriess,setCountriess]=useState()
    const labelspopulation=countries.sort((a,b)=>{return b.population-a.population}).map((k)=>k.name)
    const labelsarea=countries.sort((a,b)=>{return b.area-a.area}).map((k)=>k.name)
    const population=countries.sort((a,b)=>{return b.population-a.population}).map((k)=>k.population)
    const area=countries.sort((a,b)=>{return b.area-a.area}).map((k)=>k.area)
    console.log(area,population)
const setpages=(event, value)=>{
    console.log(value)
    setPage(value);
    scroll.current.scrollIntoView('smooth')
}
useEffect(() => {
    setPage(1);
  }, [region, value]);

  useEffect(() => {

    let showCountries = countries
    console.log(countriess)
    console.log(countries)
    console.log(showCountries)
    if (region !== "") {
      showCountries = showCountries.filter(
        (country) => country.region.toUpperCase().startsWith(region.toUpperCase())
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
    if(sortby==='area'){
      showCountries=showCountries.sort((a,b)=>b.area-a.area)
    }
    if(sortby==='population'){
      showCountries=showCountries.sort((a,b)=>b.population-a.population)
    }
    if(sortby==='borders'){
      showCountries=showCountries.filter((a)=>(a.borders))
      console.log(showCountries)
      showCountries=showCountries.sort((a,b)=>b.borders.length-a.borders.length)
     
  
    }
    setCountriess(showCountries.slice((page-1)*16,(page)*16))
  }, [countries,region, value,sortby,page]);
 
    return(
<>

<Filter value={value} setValue={setValue} region={region} setRegion={setRegion} sortby={sortby}
setSortby={setSortby}/>
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
        <p>Area : <span className="font-light opacity-80">{millify(c.area)}</span></p>
        <p>Bordering countries : <span className="font-light opacity-80">{c.borders?c.borders.length:0}</span></p>
        </div>
</div>

</>)}
</div>
<div className="flex justify-center py-2">
<Pagination count={pages} shape="rounded" variant="outlined" onChange={setpages}/>
</div>

<div style={{ maxWidth: "90vw" }}>
        <Bar
          data={{
            // Name of the variables on x-axies for each bar
            labels:labelspopulation.slice(0,29),
            datasets: [
              {
                // Label for bars
                label: "population",
                // Data or value of your each variable
                data: population.slice(0,29),
                // Color of each bar
              
                // Border color of each bar
                borderColor: ["aqua", "green", "red", "yellow"],
                borderWidth: 1,
              },
            ],
          }}
          // Height of graph
          height={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    // The y-axis value will start from zero
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 5,
              },
            },
          }}
        />
      </div>
      <div style={{ maxWidth: "90vw" }}>
        <Bar
          data={{
            // Name of the variables on x-axies for each bar
            labels:labelsarea.slice(0,29),
            datasets: [
              {
                // Label for bars
                label: "area",
                // Data or value of your each variable
                data: area.slice(0,29),
                // Color of each bar
              
                // Border color of each bar
                borderColor: ["aqua", "green", "red", "yellow"],
                borderWidth: 1,
              },
            ],
          }}
          // Height of graph
          height={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    // The y-axis value will start from zero
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 5,
              },
            },
          }}
        />
      </div>
</>
    )
}
export default Countries