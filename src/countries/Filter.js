import {useState,useEffect} from 'react'
import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem'
import SortIcon from '@material-ui/icons/Sort';

export const Filter=({value,setValue,region,setRegion,sortby,setSortby})=>{
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = (a) => {
          setSortby(a)
        setAnchorEl(null);
      };    
    return(
<>
<div className='flex space-between' >
<input type='text' placeholder='search countries' value={value} onChange={(e)=>setValue(e.target.value)} 
className=' m-1 p-2 w=30 bg-blue-100'/>
<input type='text' placeholder='search region' value={region} onChange={(e)=>setRegion(e.target.value)} 
 className=' m-1 p-2 w=30 c-white bg-blue-100'/>
   <div className=' m-1 p-2 w=30 c-white bg-blue-100'>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
        {sortby}<SortIcon/>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>handleClose('population')}>Population</MenuItem>
        <MenuItem onClick={()=>handleClose('area')}>Area</MenuItem>
        <MenuItem onClick={()=>handleClose('borders')}>borders</MenuItem>
      </Menu>
    </div>
</div>
</>
    )
}
export default Filter