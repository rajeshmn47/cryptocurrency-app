import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import moment from 'moment';
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


export const Cryptodetails=()=>{
    const[currencydetails,setCurencydetails]=useState()
    const[historicaldata,setHistoricaldata]=useState([])
    const [days, setDays] = useState(1);
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
        var options = {
          method: 'GET',
          url: 'https://investing-cryptocurrency-markets.p.rapidapi.com/coins/get-historical-data',
          params: {
            pair_ID:id.id,
            date_from: '01022022',
            date_to: '27022022',
            lang_ID: '1',
            time_utc_offset: '28800',
            interval: 'day'
          },
          headers: {
            'x-rapidapi-host': 'investing-cryptocurrency-markets.p.rapidapi.com',
            'x-rapidapi-key': '3ddef92f6emsh8301b1a8e1fd478p15bb8bjsnd0bb5446cadc'
          }
        };
        
        axios.request(options).then(function (response) {
          console.log(response.data.data[0].screen_data.data);
          setHistoricaldata(response.data.data[0].screen_data.data)
        }).catch(function (error) {
          console.error(error);
        });
    },[])
    return(
      <>
      <div className="crypto">
      {currencydetails?(currencydetails.map((c)=>
        <>
        <h1>   {c.search_main_longtext}</h1>
        <Line
         data={{
          labels: historicaldata.map((coin) => {
            
            const d = new Date(coin.date*1000);
            return d.toLocaleString()
          }),

          datasets: [
            {
              data: historicaldata.map((coin) => (coin.price)),
              label: `Price ( Past2 Days ) in currency`,
              borderColor: "#EEBC1D",
            },
          ],
        }}
        options={{
          elements: {
            point: {
              radius: 1,
            },
          },
        }}
        />
        </>)
      ):<CircularProgress   style={{ color: "gold" }}
      size={250}
      thickness={1}/>}
      </div>
      </>
    )
}
export default Cryptodetails