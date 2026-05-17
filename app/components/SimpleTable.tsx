"use client"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from "react";
import getTasks from '../API/getTasks';
import Checkbox from '@mui/material/Checkbox';

interface SimpleTableProps{
    setSelectedId: (f: any)=>void,
    selectedId: Number
}

const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };

export default function SimpleTable({ setSelectedId = f => {}, selectedId = 0 }: SimpleTableProps) {

  const [items, setItems] = useState([{id:"",name:"",status:""}]);
  
  const initiateTaskTable = async () => {
    try{
      var json = {_embedded:{taskList:[]}};
      json = await getTasks();
      setItems(json._embedded.taskList);
    }catch(error){
      if(typeof error=== "string"){
        console.error(error);
      }
    }
  };

  useEffect(() => {
    console.log("hey");
    initiateTaskTable();
  },[]);

  const handleOnClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedId(!event.target.checked? 0 : Number(event.target.name));
  };

  return (        
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell><b>Task name</b></TableCell>
                  <TableCell align="left"><b>state</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell><Checkbox {...label} onChange={handleOnClick} name={row.id} checked={selectedId===Number(row.id)}/></TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </TableContainer>
  );
}