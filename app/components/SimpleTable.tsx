"use client"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from "react";

export default function SimpleTable() {

  const [items, setItems] = useState([{name:"",status:""}]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  function createData(
    name: string,
    state: string
  ) {
    return { name, state };
  }

  useEffect(() => {
    console.log("hey");
    fetch("http://localhost:8080/tasks")
      .then((res) => res.json())
      .then((json) => {
        setItems(json._embedded.taskList);
        //setDataIsLoaded(true);
        const taskList = json._embedded.taskList;
        console.log(json._embedded.taskList);
    });
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