import React, { useState, useEffect} from 'react';
import {Box} from '@material-ui/core';
import Button from '@mui/material/Button'
import axios from '../axios/axios';
import { DataGrid } from '@mui/x-data-grid';
import AddCoursesDetails from '../actions/addCoursesDetails';

function CoursesDetails() {
  const [addCourseDetailsShow, setAddCourseDetailsShow] = useState(false);
    const [tableData, setTableData]=useState([]);

    const fetchData = () => {
        //console.log('Start fetchData CoursesDetails');
        axios.get('http://localhost:5000/api/CoursesDetails')
        .then(({ data }) => {
            const jsonData = JSON.stringify(data);  
            setTableData(data); 
            //console.log('Data: ' + JSON.stringify(data));     
        }).catch((e) => {
            console.log(e);
        })
        //console.log('End fetchDataCoursesDetails');
    }

    const openAddCourseDetails = () => {
      //console.log('Try to open add user');
      setAddCourseDetailsShow(true);
    }
    const addCourseDetailsClose = () => {
      //console.log('Try to close add user');
      setAddCourseDetailsShow(false);
    };
    
    useEffect(() => {
        fetchData();
    }, [])

    const columns = [
      {field: 'Id', headerName: 'ID', width: 90 },
      {field: 'Name', headerName: 'Name', width: 120, editable: true, },
      {field:"TimeCreated", headerName: "Time Created", type: 'date', width: 100, editable: true,valueGetter: (params) => new Date(params.value),}, 

    ];

  return (
    <div>
      {addCourseDetailsShow ? (<AddCoursesDetails open={addCourseDetailsShow} close={() => addCourseDetailsClose()}/>) : null}
      <Box sx={{ height: 400, width: '100%' }} style={{width: '70%', marginLeft: 'auto', marginRight: 'auto', marginTop: '3%'}}>
        <Button 
          variant="contained" 
          style={{whiteSpace: 'nowrap', marginRight: '90%'}}
          onClick={openAddCourseDetails}
        >Add Course Details</Button>
         <DataGrid
           getRowId={(row) => row.Id}
           columns={columns} 
           rows= {tableData} 
           autoHeight={true}
           slots={{
                noRowsOverlay: () => <p style={{marginTop: '2%',fontSize:'28px'}}>Data is empty</p>
            }}
           initialState={{
             pagination: {
               paginationModel: {
                 pageSize: 5,
               },
             },
           }}
           pageSizeOptions={[5]}
           checkboxSelection
           disableRowSelectionOnClick
         />
       </Box>
    </div>
  )
}

export default CoursesDetails