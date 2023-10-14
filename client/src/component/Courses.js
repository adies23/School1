import React, { useState, useEffect} from 'react';
import {Box} from '@material-ui/core';
import Button from '@mui/material/Button'
import axios from '../axios/axios';
import { DataGrid } from '@mui/x-data-grid';
import AddCourse from '../actions/AddCourse';

function Courses() {
  const [addCourseShow, setAddCourseShow] = useState(false);
  const [tableData, setTableData]=useState([]);

    const fetchData = () => {
        //console.log('Start fetchData Courses');
        axios.get('http://localhost:5000/api/Courses')
        .then(({ data }) => {
            const jsonData = JSON.stringify(data);  
            console.log('JSON.stringify(data): ' + JSON.stringify(data));
            setTableData(data); 
        }).catch((e) => {
            console.log(e);
        })
        //console.log('End fetchData Courses');
    }

    const openAddCourse = () => {
      //console.log('Try to open add user');
      setAddCourseShow(true);
    }
    const addCourseClose = () => {
      //console.log('Try to close add user');
      setAddCourseShow(false);
    };
    
    useEffect(() => {
      //console.log('Start useEffect');
      fetchData();
    }, [addCourseShow]);

    const columns = [
      {field: 'Id', headerName: 'ID', width: 90 },
      {field: 'Name', headerName: 'Name', width: 120, editable: true, },
      {field:"TimeCreated", headerName: "Time Created", type: 'date', width: 100,valueGetter: (params) => new Date(params.value),}, 

    ];

  return (
    <div>
      {addCourseShow ? (<AddCourse open={addCourseShow} close={() => addCourseClose()}/>) : null}
      <Box sx={{ height: 400, width: '100%' }} style={{width: '70%', marginLeft: 'auto', marginRight: 'auto', marginTop: '3%'}}>
        <Button 
          variant="contained" 
          style={{marginRight: '90%'}}
          onClick={openAddCourse}
        >Add Course</Button>
         <DataGrid
           getRowId={(row) => row.Id}
           columns={columns} 
           rows={tableData}
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

export default Courses