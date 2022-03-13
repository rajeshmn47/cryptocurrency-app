import { useNavigate,useParams } from "react-router-dom";
import { useEffect,useState,useRef} from "react";
import React from "react";
import millify from "millify";
import mapboxgl from 'mapbox-gl';
import { Room, Star, StarBorder } from "@material-ui/icons";
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, {
    Marker,
    GeolocateControl,
    NavigationControl,
} from 'react-map-gl';
import useSWR from 'swr';


  mapboxgl.accessToken = 'pk.eyJ1IjoicmFqZXNobW40NyIsImEiOiJja3p5Y3BpYWswNGsyMm5wY25panAzYWp4In0.c9qSA5OqiBYo6sKGWHlxgw'
  

export const Countrydetail=({countries})=>{
    const [viewport, setViewport] = React.useState({
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      });
      const[newPlace,setNewPlace]=React.useState({lat:37.7577
        ,long:-122.4376})
    const mapboxElRef = useRef(null);
    console.log(countries)
    const[detail,setDetail]=useState()
    let { id } = useParams();
    console.log(id)
    let navigate = useNavigate();
    let country = countries?.find((item) => {
        return item.alpha3Code === id;
      });
      console.log(country)
    
      useEffect(() => {
          const map = new mapboxgl.Map({
            container: mapboxElRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [country.latlng[1],country.latlng[0]], // initial geo location
            zoom: 3 // initial zoom
          });
          map.addControl(new mapboxgl.NavigationControl());
    
          // Add navigation control to center your map on your location
          map.addControl(
            new mapboxgl.GeolocateControl({
              fitBoundsOptions: { maxZoom: 10 }}))
              map.on('load', () => {
                map.on('load', () => {
                    map.addLayer({
                        "type": "geojson",
                        "data": {
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-77.0323, 38.9131]
                            },
                            "properties": {
                                "title": "Mapbox DC",
                                "marker-symbol": "monument"
                            }
                        }
                    })
                  });
              });
        },[countries])
    return(
<>
<h1>{country.name}</h1>
<img src={country.flag} alt='' width='200'/>
<p>population:{millify(country.population)}</p>
<div style={{width:'100vw'}}>
      <div className="mapContainer" >
        <div className="mapBox"  ref={mapboxElRef} />
      </div>
    </div>
  
</>
    )
}
export default Countrydetail