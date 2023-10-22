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
  
      // Send a POST request with the selected supplier
      axios.post('/getAllPoNumberOnSupplier', { supplier: selectSupplier })
        .then((res) => {
          setLoading(true)
          setPoNumbers(res.data);
          setLoading(false)
         // console.log("getAllPoNumberOnSupplier", res.data)
        })
        .catch((error) => {
         // console.log(' getAllPoNumberOnSupplier Error', error);
        });
    };
  
  
    const handlePoNumberChange = (event) => {
      const selectPoNumber = event.target.value;
      setLoading(true)
      setSelectedPoNumber(selectPoNumber);
      setLoading(false)
     // console.log("selectedPoNumber", selectedPoNumber)
      // Send a POST request with the selected supplier
      axios.post('/getAllDataOnPoNumber', { poNumber: selectPoNumber })
        .then((res) => {
            setLoading(true)
          setData(res.data);
          setLoading(false)
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
            setLoading(true)
          setSuppliers(res.data);
          setLoading(false)
        })
        .catch((error) => {
          //console.log('GetAllSupplier Error', error);
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
                <Grid item sm={12} md={6} lg={4} className='border-t-2'>
                    {data.map((d, index) => (
                        <Card key={index} className='m-2 p-4 border rounded-lg shadow-md hover:bg-slate-100'>
                            <p className="text-lg font-semibold my-4 border-b-2 p-2">PO_Number: {d.PO_Number}</p>
                            <p className="text-lg font-semibold my-4 border-b-2 p-2">Order_Value: {d.Order_Value}</p>
                            <p className="text-lg font-semibold my-4 border-b-2 p-2">Amount_Invoiced: {d.Amount_Invoiced}</p>
                            <p className="text-lg font-semibold my-4 border-b-2 p-2">Description: {d.Description}</p>
                        </Card>
                    ))}
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
