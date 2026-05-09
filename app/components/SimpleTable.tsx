"use client"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from "react";
import getTasks from '../../API/getTasks';

export default function SimpleTable() {

  const [items, setItems] = useState([{name:"",status:""}]);

  function createData(
    name: string,
    state: string
  ) {
    return { name, state };
  };
  
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

  return (        
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
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