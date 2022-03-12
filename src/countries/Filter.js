import {useState,useEffect} from 'react'

export const Filter=({value,setValue,region,setRegion})=>{
    return(
<>
<div className='flex space-between' >
<input type='text' placeholder='search countries' value={value} onChange={(e)=>setValue(e.target.value)} 
className=' m-1 p-2 w=30 bg-blue-100'/>
<input type='text' placeholder='search region' value={region} onChange={(e)=>setRegion(e.target.value)} 
 className=' m-1 p-2 w=30 c-white bg-blue-100'/>
</div>
</>
    )
}
export default Filter