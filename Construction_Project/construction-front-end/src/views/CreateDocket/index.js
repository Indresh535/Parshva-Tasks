import React, { useState, useEffect } from 'react';
import { axios } from '../../api/mySqlClient';
import { Box, Card, Container, Grid, Select, FormControl, FormHelperText, MenuItem, InputLabel, TextField, Button} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';

const CreateDocket = () => {
    const initialValues = [{
        name: '',         // Initialize with empty values
        startTime: '',
        endTime: '',
        hoursWorked: '',
        ratePerHour: '',
      }]

    const [userData, setUserData] = useState(initialValues);
    const [suppliers, setSuppliers] = useState([]); // Initialize with an empty array
    const [selectedSupplier, setSelectedSupplier] = useState(''); // State to store the selected supplier
    const [poNumbers, setPoNumbers] = useState([]); // State to store the PO numbers
    const [selectedPoNumber, setSelectedPoNumber] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const {id, value} = e.target
        setUserData({
            ...userData,
            [id]: value
          })
          //console.log("userData", userData)
    }
  
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


    const CreateDocket = (e) => {
        e.preventDefault()
        

  // Create an object containing the construction data, selected supplier, and PO number
  const docketData = {
    name : userData.name,
    startTime : userData.startTime,
    endTime : userData.endTime,
    hoursWorked : userData.hoursWorked,
    ratePerHour : userData.ratePerHour,
    selectedSupplier,
    selectedPoNumber,
  };
        axios.post('/createDocket', { docketData })
        .then((res) => {
          // Handle the response, e.g., show a success message
         // console.log('Docket created successfully');
          toast.success("Docket created successfully")
        })
        .catch((error) => {
          // Handle errors, e.g., show an error message
          console.error('Error creating docket:', error);
        });
    };
   
  return (
    <div>      
    <div className="p-4 text-center text-2xl font-extrabold">
    <h1> This is a Construction App Task's Assigned by Parshva Holdings, LLC</h1>
  </div>
    <Container maxWidth='lg' className='shadow-lg border'>   
        <Box>
        <h1 className='text-2xl text-center font-semibold py-2'> Create Docket</h1>
        <Grid container spacing={2} className='p-4 mb-4'>
                <Grid item lg={12} sm={12} className='flex flex-row justify-center items-center'>           
                    <FormControl fullWidth>
                        <TextField id="name" label="Name" variant="outlined" onChange={handleChange} />
                        <FormHelperText>Enter Your Supplier</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item lg={6} sm={12} className='flex flex-row justify-center items-center'>           
                    <FormControl fullWidth>
                        <TextField type='date' id="startTime" label="Start Time" variant="outlined" InputLabelProps={{
                            shrink: true,
                          }} onChange={handleChange}/>
                        <FormHelperText>Enter Your Start Time</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item lg={6} sm={12} className='flex flex-row justify-center items-center'>           
                    <FormControl fullWidth>
                        <TextField type='date' id="endTime" label="End Time" variant="outlined" InputLabelProps={{
                            shrink: true,
                          }} onChange={handleChange}/>
                        <FormHelperText>Enter Your End Time</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item lg={6} sm={12} className='flex flex-row justify-center items-center'>           
                    <FormControl fullWidth>
                        <TextField type='number' id="hoursWorked" label="No. of Hours Worked" variant="outlined" onChange={handleChange}/>
                        <FormHelperText>Enter No. of Hours Worked</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item lg={6} sm={12} className='flex flex-row justify-center items-center'>           
                    <FormControl fullWidth>
                        <TextField type='number' id="ratePerHour" label="Rate Per hour" variant="outlined"  onChange={handleChange}/>
                        <FormHelperText>Enter Rate Per Hour</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item lg={6} sm={12} className='flex flex-row justify-center items-center'>           
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-helper-label1">Supplier Name</InputLabel>
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
                <Grid item lg={6} sm={12} className='flex flex-row justify-center items-center'>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-helper-label44">PO Number</InputLabel>
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
                <Grid item xs={12} className='flex flex-row justify-center items-center'>
                <FormControl fullWidth>
                    <Button variant='contained' className='m-4' onClick={CreateDocket}>Create Docket</Button>
                </FormControl>
                </Grid>
                <Grid item xs={12} className='mt-4 border-t-2 flex flex-wrap'>
                        <Grid container spacing={2}>
                        {data.map((d, index) => (
                            <Grid item lg={4} md={6} sm={12} key={index}>
                                <Card className='m-2 p-4 border rounded-lg shadow-md hover:bg-slate-100 flex flex-col items-start'>
                                    <p className="text-lg font-semibold my-4 border-b-2 p-2">PO_Number: {d.PO_Number}</p>
                                    <p className="text-lg font-semibold my-4 border-b-2 p-2">Description: {d.Description}</p>
                                    <p className="text-lg font-semibold my-4 border-b-2 p-2">Order_Value: {d.Order_Value}</p>
                                    <p className="text-lg font-semibold my-4 border-b-2 p-2">Amount_Invoiced: {d.Amount_Invoiced}</p>                                    
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

export default CreateDocket
