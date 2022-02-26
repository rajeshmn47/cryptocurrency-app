import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'

export const Cryptodetails=()=>{
    const[currencydetails,setCurencydetails]=useState()
    const id=useParams()
    console.log(id)
    useEffect(()=>{
        var axios = require("axios").default;

        var options = {
          method: 'GET',
          url: 'https://investing-cryptocurrency-markets.p.rapidapi.com/coins/get-overview',
          params: {pair_ID: id.id, time_utc_offset: '28800', lang_ID: '1'},
          headers: {
            'x-rapidapi-host': 'investing-cryptocurrency-markets.p.rapidapi.com',
            'x-rapidapi-key': '3ddef92f6emsh8301b1a8e1fd478p15bb8bjsnd0bb5446cadc'
          }
        };
        
        axios.request(options).then(function (response) {
            console.log(response.data.data[0].screen_data.pairs_attr);
            setCurencydetails(response.data.data[0].screen_data.pairs_attr)
            
        }).catch(function (error) {
            console.error(error);
        });
    },[])
    return(
      <>
      {currencydetails&&currencydetails.map((c)=>
        <>
        <h1>   {c.search_main_longtext}</h1>
        </>)}
        </>
    )
}
export default Cryptodetails