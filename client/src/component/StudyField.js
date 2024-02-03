import React, { useState, useEffect} from 'react';
import {Box} from '@material-ui/core';
import Button from '@mui/material/Button'
import axios from '../axios/axios';
import { DataGrid } from '@mui/x-data-grid';
import AddStudyField from '../actions/AddStudyField';

function StudyFields() {
  const [addStudyFieldShow, setAddStudyFieldShow] = useState(false);
  const [tableData, setTableData]=useState([]);

    const fetchData = () => {
        //console.log('Start fetchData StudyFields');
        axios.get('http://localhost:5000/api/StudyFields')
        .then(({ data }) => {
            const jsonData = JSON.stringify(data);  
            console.log('JSON.stringify(data): ' + JSON.stringify(data));
            setTableData(data); 
        }).catch((e) => {
            console.log(e);
        })
        //console.log('End fetchData StudyFields');
    }

    const openAddStudyField = () => {
      //console.log('Try to open add user');
      setAddStudyFieldShow(true);
    }
    const addStudyFieldClose = () => {
      //console.log('Try to close add user');
      setAddStudyFieldShow(false);
    };
    
    useEffect(() => {
      //console.log('Start useEffect');
      fetchData();
    }, [addStudyFieldShow]);

    const columns = [
      {field: 'Id', headerName: 'ID', width: 90 },
      {field: 'Name', headerName: 'Name', width: 200, editable: true, },
      {field:"TimeCreated", headerName: "Time Created", type: 'date', width: 100,valueGetter: (params) => new Date(params.value),}, 

    ];

  return (
    <div>
      {addStudyFieldShow ? (<AddStudyField open={addStudyFieldShow} close={() => addStudyFieldClose()}/>) : null}
      <Box sx={{ height: 400, width: '100%' }} style={{width: '70%', marginLeft: 'auto', marginRight: 'auto', marginTop: '3%'}}>
        <Button 
          variant="contained" 
          style={{whiteSpace: 'nowrap', marginRight: '90%',border: '1px solid black', borderRadius: '10px'}}
          onClick={openAddStudyField}
        >Add Study Field</Button>
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
           sx={{
             backgroundColor: "white",
             border: "2px solid black",
             borderRadius: "13px"
           }}
         />
       </Box>
    </div>
  )
}

export default StudyFields