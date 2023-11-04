import React, { useState, useEffect } from 'react';
import { axios } from '../../api/mySqlClient';
import { Box, Card, Container, Grid, Select, FormControl, FormHelperText, MenuItem, InputLabel, TextField, Button} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton'

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
    const [errors, setErrors] = useState([]);

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
        setLoading(true)
       // Reset errors
       setErrors({});
       const newErrors = {};

       if (!userData.name) {
           newErrors.name = 'Please Enter Name';
       }
       if (!userData.startTime) {
           newErrors.startTime = 'Please Enter StartTime';
       }
       if (!userData.endTime) {
           newErrors.endTime = 'Please Enter EndTime';
       }
       if (!userData.hoursWorked) {
           newErrors.hoursWorked = 'Please Enter No. of Hours Worked';
       }
       if (!userData.ratePerHour) {
           newErrors.ratePerHour = 'Please Enter Rate Per Hour';
       }
       if (!selectedSupplier) {
        newErrors.selectedSupplier = 'Please Select Supplier';
        }
        if (!selectedPoNumber) {
            newErrors.selectedPoNumber = 'Please Select PO Number';
        }


       if (Object.keys(newErrors).length > 0) {
           setErrors(newErrors);
           return; // Don't proceed if there are errors
       }

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
        setLoading(false)
        setTimeout(() => {
            window.location.reload(false);
          }, 3000); // 2000 milliseconds (2 seconds) delay
        
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
                        <TextField id="name" error={!!errors.name} label="Name" variant="outlined" onChange={handleChange} />
                        {errors.name && <p className="font-semibold text-red-600">{errors.name}</p>}
                        <FormHelperText>Enter Your Supplier</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item lg={6} sm={12} className='flex flex-row justify-center items-center'>           
                    <FormControl fullWidth>
                        <TextField type='date' error={!!errors.startTime} id="startTime" label="Start Time" variant="outlined" InputLabelProps={{
                            shrink: true,
                          }} onChange={handleChange}/>
                          {errors.startTime && <p className="font-semibold text-red-600">{errors.startTime}</p>}
                        <FormHelperText>Enter Your Start Time</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item lg={6} sm={12} className='flex flex-row justify-center items-center'>           
                    <FormControl fullWidth>
                        <TextField type='date' error={!!errors.endTime} id="endTime" label="End Time" variant="outlined" InputLabelProps={{
                            shrink: true,
                          }} onChange={handleChange}/>
                          {errors.endTime && <p className="font-semibold text-red-600">{errors.endTime}</p>}
                        <FormHelperText>Enter Your End Time</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item lg={6} sm={12} className='flex flex-row justify-center items-center'>           
                    <FormControl fullWidth>
                        <TextField type='number' error={!!errors.hoursWorked} id="hoursWorked" label="No. of Hours Worked" variant="outlined" onChange={handleChange}/>
                        {errors.hoursWorked && <p className="font-semibold text-red-600">{errors.hoursWorked}</p>}
                        <FormHelperText>Enter No. of Hours Worked</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item lg={6} sm={12} className='flex flex-row justify-center items-center'>           
                    <FormControl fullWidth>
                        <TextField type='number' error={!!errors.ratePerHour} id="ratePerHour" label="Rate Per hour" variant="outlined"  onChange={handleChange}/>
                        {errors.ratePerHour && <p className="font-semibold text-red-600">{errors.ratePerHour}</p>}
                        <FormHelperText>Enter Rate Per Hour</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item lg={6} sm={12} className='flex flex-row justify-center items-center'>           
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-helper-label1">Supplier Name</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="supplier"
                            error={!!errors.selectedSupplier}
                            label="--Select Supplier--"
                            value={selectedSupplier} // Set the selected supplier
                            onChange={handleSupplierChange}
                        >
                        {suppliers.map((sup, index) => (
                            <MenuItem key={index} value={sup.Supplier}>
                            {sup.Supplier}
                            </MenuItem>
                        ))}
                        </Select>
                        {errors.selectedSupplier && <p className="font-semibold text-red-600">{errors.selectedSupplier}</p>}
                        <FormHelperText>Select Supplier</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item lg={6} sm={12} className='flex flex-row justify-center items-center'>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-helper-label44">PO Number</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="poNumber"
                        error={!!errors.selectedPoNumber}
                        label="--Select PO Number--"
                        value={selectedPoNumber} // Set the selected PO number
                        onChange={handlePoNumberChange}
                    >
                        {poNumbers.map((po, index) => (
                            <MenuItem value={po} key={index}>
                            {po}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.selectedPoNumber && <p className="font-semibold text-red-600">{errors.selectedPoNumber}</p>}
                    <FormHelperText>Select Supplier To Display PO Number</FormHelperText>
                </FormControl>
                </Grid>
                <Grid item xs={12} className='flex flex-row justify-center items-center'>
                <FormControl fullWidth>
                    <LoadingButton loading={loading} variant='contained' className='m-4' onClick={CreateDocket}>Create Docket</LoadingButton>
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
