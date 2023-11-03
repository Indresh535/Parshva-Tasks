import React, { useState, useEffect } from 'react';
import { axios } from '../../api/mySqlClient';
import { Box, Card, Container, Grid, CardContent,  CardActionArea} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


const ViewDocket = () => {
    const [loading, setLoading] = useState(false);
    const [docketData, setDocketData] = useState([]);

    useEffect(() => {
        // Fetch all suppliers
              setLoading(true)
        axios.get('/GetAllUsersDocketData')
          .then((res) => {
            setDocketData(res.data);
            setLoading(false)
            //console.log('GetAllUsersDocketData Error', docketData);
          })
          .catch((error) => {
            //console.log('GetAllUsersDocketData Error', error);
          })
          .finally(() => {
              setLoading(false);
          });
      }, []);

  return (
    <div>
   <div className="p-4 text-center text-2xl font-extrabold my-4">
    <h1> This is a Construction App Task's Assigned by Parshva Holdings, LLC</h1>
  </div>
    <Container maxWidth='lg' className='shadow-lg'>   
        <Box>
        <h1 className='text-2xl text-center font-semibold py-2'>All Docket Lists</h1>
        <Grid container spacing={2} className='p-4 mb-4'> 
        {docketData.map((data, index) => (
                <Grid item lg={6} sm={12}> 
                <Card className="p-4 bg-white shadow-md border rounded-lg">
                <CardActionArea>
                    <CardContent>
                        <h2 className="text-xl font-semibold text-center mb-4 underline">User Information</h2>                        
                        <div className="text-center font-semibold text-xl mb-4">
                            <p><b>Name:</b> {data.UserName}</p>
                        </div>
                        <div className="flex flex-wrap justify-around">
                            <div className="w-1/2 mb-4 border-b-2">
                                <p><b>Start Time:</b><br /> {data.StartTime}</p>
                            </div>
                            <div className="w-1/2 mb-4 border-b-2">
                                <p><b>End Time:</b><br /> {data.EndTime}</p>
                            </div>
                            <div className="w-1/2 mb-4 border-b-2">
                                <p><b>Hours Worked:</b><br /> {data.HoursWorked}</p>
                            </div>
                            <div className="w-1/2 mb-4 border-b-2">
                                <p><b>Rate Per Hour:</b><br /> {data.RatePerHour}</p>
                            </div>
                            <div className="w-1/2 mb-4 border-b-2">
                                <p><b>Selected Supplier:</b><br /> {data.SelectedSupplier}</p>
                            </div>
                            <div className="w-1/2 mb-4 border-b-2">
                                <p><b>Selected PO Number:</b><br /> {data.SelectedPO_Number}</p>
                            </div>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>                   
                </Grid>      
                ))}            
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

export default ViewDocket
