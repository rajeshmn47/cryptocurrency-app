import {useGetCryptosQuery} from '../services/Cryptoapi'
import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';


export const Cryptolist=()=>{
    const [cryptos,setCryptos]=useState()
    const[page,setPage]=useState(1)
    const { data, isFetching } = useGetCryptosQuery(page);
    const [searchTerm, setSearchTerm] = useState('');
    console.log(cryptos)
    useEffect(() => {
     console.log(data&&data?.data[0].screen_data.crypto_data)
     setCryptos(data&&data?.data[0].screen_data.crypto_data)
    
      }, [ searchTerm,data,page]);
    return(
        <>
        <div className='title'>coins list</div>
        <div className='border'></div>
<div className='coinlist'>
{cryptos?.map((c)=>
 <>
 <div className='coin'>
    <p>{c.name}</p>
    <div>{<img src={c.flag_url} alt=''/>}</div>
    <p style={{color:'red'}}>change:{c.change_percent_1d}</p>
    <p style={{color:'green'}}>Market Cap:{millify(c.inst_market_cap_plain)}</p>
    </div>
</>
)}
</div>
</>
    )
}

export default Cryptolist