import React, { useState, useEffect } from 'react';
import { axios } from '../../api/mySqlClient';
import { Box, Card, Container, Grid, Select, FormControl, FormHelperText, MenuItem, InputLabel} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Construction = () => {
    const [suppliers, setSuppliers] = useState([]); // Initialize with an empty array
    const [selectedSupplier, setSelectedSupplier] = useState(''); // State to store the selected supplier
    const [poNumbers, setPoNumbers] = useState([]); // State to store the PO numbers
    const [selectedPoNumber, setSelectedPoNumber] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

  
    const handleSupplierChange = (event) => {
      const selectSupplier = event.target.value;
      setSelectedSupplier(selectSupplier);
      //console.log(' selectedSupplier', selectedSupplier);  
      setLoading(true)
      // Send a POST request with the selected supplier
      axios.post('/getAllPoNumberOnSupplier', { supplier: selectSupplier })
        .then((res) => {
          setPoNumbers(res.data);
          setLoading(false)
         // console.log("getAllPoNumberOnSupplier", res.data)
        })
        .catch((error) => {
         // console.log(' getAllPoNumberOnSupplier Error', error);
        })
        .finally(() => {
            setLoading(false);
        });
    };
  
  
    const handlePoNumberChange = (event) => {
      const selectPoNumber = event.target.value;
      setLoading(true)
      setSelectedPoNumber(selectPoNumber);
     // console.log("selectedPoNumber", selectedPoNumber)
      // Send a POST request with the selected supplier
      axios.post('/getAllDataOnPoNumber', { poNumber: selectPoNumber })
        .then((res) => {
          setData(res.data);
          setLoading(false)
         // console.log("getAllDataOnPoNumber", res.data)
        })
        .catch((error) => {
         // console.log('getAllDataOnPoNumber Error', error);
        })
        .finally(() => {
            setLoading(false);
        });
    };
  
    useEffect(() => {
      // Fetch all suppliers
            setLoading(true)
      axios.get('/GetAllSupplier')
        .then((res) => {
          setSuppliers(res.data);
          setLoading(false)
        })
        .catch((error) => {
          //console.log('GetAllSupplier Error', error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);
    //throw Promise.reject("test")
  return (
    <div>
      
    <div className="p-4 text-center text-2xl font-extrabold my-4">
    <h1> This is a Construction App Task's Assigned by Parshva Holdings, LLC</h1>
  </div>
    <Container maxWidth='lg' className='shadow-lg border'>   
        <Box>
        <Grid container spacing={2}>
                <Grid item xs={6}>           
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
                <Grid item xs={12} className='border-t-2 flex flex-wrap'>
                        <Grid container spacing={2}>
                        {data.map((d, index) => (
                            <Grid item lg={4} md={6} sm={12} key={index}>
                                <Card className='m-2 p-4 border rounded-lg shadow-md hover:bg-slate-100 flex flex-col items-start'>
                                    <p className="text-lg font-semibold my-4 border-b-2 p-2">PO_Number: {d.PO_Number}</p>
                                    <p className="text-lg font-semibold my-4 border-b-2 p-2">Order_Value: {d.Order_Value}</p>
                                    <p className="text-lg font-semibold my-4 border-b-2 p-2">Amount_Invoiced: {d.Amount_Invoiced}</p>
                                    <p className="text-lg font-semibold my-4 border-b-2 p-2">Description: {d.Description}</p>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>         
            </Grid>
        </Box>    
        {loading && (
            <div className='flex justify-center items-center'>
            <div className="animate-bounce mb-2 text-3xl">
                <div className="h-10 w-10 border-t-4 border-blue-500 rounded-full animate-spin">  
                    <CircularProgress /> 
                </div>
                Loading...
            </div>  
            </div>
        )}
        </Container>
        
    </div>
  )
}

export default Construction
