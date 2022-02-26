import React, { useEffect, useState,useRef } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import {useGetCryptosQuery} from '../services/Cryptoapi'


export const Cryptolist=()=>{
    const [cryptos,setCryptos]=useState()
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
        <div className='title'>coins list</div>
        <div className='border'></div>
<div className='coinlist' ref={scroller}>
{cryptos?.map((c)=>
 <>
 <Link to={`/details/${c.pair_id}`}>
 <div className='coin'>
    <p>{c.name}</p>
    <div>{<img src={c.flag_url} alt=''/>}</div>
    <p style={{color:'red'}}>change:{c.change_percent_1d}</p>
    <p style={{color:'green'}}>Market Cap:{millify(c.inst_market_cap_plain)}</p>
    </div>
    </Link>
</>
)}
</div>
<div className='pagination'>
<Pagination count={30} page={page} onChange={change} style={{color:'white'}}/>
</div>
</>
    )
}

export default Cryptolist