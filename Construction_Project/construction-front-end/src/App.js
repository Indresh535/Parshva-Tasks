import React, { useState, useEffect } from 'react';
import './styles/tailwind.css';
import { axios } from './api/mySqlClient';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Card, Container, Grid } from '@mui/material';

const App = () => {
  const [suppliers, setSuppliers] = useState([]); // Initialize with an empty array
  const [selectedSupplier, setSelectedSupplier] = useState(''); // State to store the selected supplier
  const [poNumbers, setPoNumbers] = useState([]); // State to store the PO numbers
  const [selectedPoNumber, setSelectedPoNumber] = useState('');
  const [data, setData] = useState([]);

  const handleSupplierChange = (event) => {
    const selectSupplier = event.target.value;
    setSelectedSupplier(selectSupplier);
    //console.log(' selectedSupplier', selectedSupplier);

    // Send a POST request with the selected supplier
    axios.post('/getAllPoNumberOnSupplier', { supplier: selectSupplier })
      .then((res) => {
        setPoNumbers(res.data);
       // console.log("getAllPoNumberOnSupplier", res.data)
      })
      .catch((error) => {
       // console.log(' getAllPoNumberOnSupplier Error', error);
      });
  };


  const handlePoNumberChange = (event) => {
    const selectPoNumber = event.target.value;
    setSelectedPoNumber(selectPoNumber);
   // console.log("selectedPoNumber", selectedPoNumber)
    // Send a POST request with the selected supplier
    axios.post('/getAllDataOnPoNumber', { poNumber: selectPoNumber })
      .then((res) => {
        setData(res.data);
       // console.log("getAllDataOnPoNumber", res.data)
      })
      .catch((error) => {
       // console.log('getAllDataOnPoNumber Error', error);
      });
  };

  useEffect(() => {
    // Fetch all suppliers
    axios.get('/GetAllSupplier')
      .then((res) => {
        setSuppliers(res.data);
      })
      .catch((error) => {
        //console.log('GetAllSupplier Error', error);
      });
  }, []);

  return (
    <div>   
    <div className="bg-blue-500 text-white p-4 text-center text-2xl font-extrabold hover:bg-red-700 mb-4">
      <h1> This is a Construction App Task's by Parshva Holdings, LLC</h1>
    </div>
    <Container maxWidth='lg'>   
      <Box className='shadow-lg'>
        <Grid container>
                <Grid item xs={6} spacing={2}>           
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label1">Supplier</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper1"
                            label="Supplier"
                            value={selectedSupplier} // Set the selected supplier
                            onChange={handleSupplierChange}
                        >
                        {suppliers.map((sup, index) => (
                            <MenuItem key={index} value={sup.Supplier}>
                            {sup.Supplier}
                            </MenuItem>
                        ))}
                        </Select>
                        <FormHelperText>Select Supplier</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">PO Number</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label="PO Number"
                        value={selectedPoNumber} // Set the selected PO number
                        onChange={handlePoNumberChange}
                    >
                        {poNumbers.map((po, index) => (
                            <MenuItem value={po} key={index}>
                            {po}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>Select Supplier To Display PO Number</FormHelperText>
                </FormControl>
                </Grid>
                <Grid xs={12} className='border-t-2'>
                    {data.map((d, index) => (
                        <Card key={index} className='m-2 p-4'>        
                        PO_Number: {d.PO_Number}<br/>
                        Order_Value: {d.Order_Value}<br/>
                        Amount_Invoiced: {d.Amount_Invoiced}<br/>
                        Description: {d.Description}
                        </Card>
                    ))}
                </Grid>
        </Grid>
        </Box>    
      </Container>
    </div>
  );
}

export default App;
