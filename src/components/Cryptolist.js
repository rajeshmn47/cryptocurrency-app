import React, { useEffect, useState,useRef } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import {useGetCryptosQuery} from '../services/Cryptoapi'
import { Bar } from "react-chartjs-2";

export const Cryptolist=()=>{
    const [cryptos,setCryptos]=useState([])
    const[page,setPage]=useState(1)
    const { data, isFetching } = useGetCryptosQuery(page);
    const [searchTerm, setSearchTerm] = useState('');
    console.log(isFetching)
    const scroller=useRef()
      
    useEffect(() => {
        console.log(data)
     console.log(data&&data?.data[0].screen_data.crypto_data)
     const home=(data&&data?.data[0].screen_data.crypto_data)
   
     console.log(home)
     const o=home?.slice(((page-1)*10),((page+1)*10)).sort((a,b)=>
         b.change_percent_7d-a.change_percent_7d
     )
     console.log(o)
     setCryptos(o)
     if(scroller.current){
    scroller.current.scrollIntoView({behavior:"smooth"})}}, [ searchTerm,data,page]);
const change=(event,value)=>{
console.log(event,value)
setPage(value)
}
    return(
        <>
      <h1 style={{fontSize:'10vmax'}}>welcome</h1>
      {cryptos?.map((c)=><>
      {c.name}
      <img src={c.img} alt ='r' width='300'/>
      </>)}
      <div className="App">
      <h1>GEEKSFORGEEKS BAR CHART REACTJS</h1>
      <div style={{ maxWidth: "650px" }}>
      <Bar
          data={{
            // Name of the variables on x-axies for each bar
            labels:['e','w','s','m'],
            datasets: [
              {
                // Label for bars
                label: "population",
                // Data or value of your each variable
                data: [1,4,20,50],
                // Color of each bar
              
                // Border color of each bar
                borderColor: ["aqua", "green", "red", "yellow"],
                borderWidth: 0.5,
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
                fontSize: 15,
              },
            },
          }}
        />
      </div>
    </div>
</>
    )
}

export default Cryptolist