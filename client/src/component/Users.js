import React, { useState, useEffect} from 'react';
import {Box} from '@material-ui/core';
import Button from '@mui/material/Button'
import axios from '../axios/axios';
import { DataGrid } from '@mui/x-data-grid';

import UserActions from '../component/UserActions';
import AddUser from '../actions/AddUser';
import classes from './Users.module.css';

function Users() { 
    const [addUserShow, setAddUserShow] = useState(false);
    const [tableData, setTableData]=useState([]);

    const fetchData = () => {
        //console.log('Start fetchData users');
        axios.get('http://localhost:5000/api/users')
        .then(({ data }) => {
            //setLoading(false);
            const jsonData = JSON.stringify(data);  
            setTableData(data);     
            console.log('Data: ' + JSON.stringify(data));  
        }).catch((e) => {
            //setLoading(false);
            console.log(e);
        })
        //console.log('End fetchData users');
    }

    const openAddUser = () => {
      //console.log('Try to open add user');
      setAddUserShow(true);
    }
    const addUserClose = () => {
      //console.log('Try to close add user');
      setAddUserShow(false);
    };

    const columns = [
      {field: 'Id', headerName: 'ID', width: 70 },
      {field: 'FirstName', headerName: 'First name', width: 100, },
      {field: 'LastName', headerName: 'Last name', width: 120, },      
      {field:"Birthday", headerName: "Birthday", type: 'date', width: 100,valueGetter: (params) => new Date(params.value),}, 
      {field:"Email", headerName: "Email", type: 'email', width: 250,}, 
      {field:"PhoneNumber", headerName: "Phone Number", type: 'numeric', width: 140,}, 
      {field:"isTeacher", headerName: "Is Teacher", type: 'boolean', width: 90}, 
      {field:"isManager", headerName: "Is Manager", type: 'boolean', width: 90}, 
      {field:"actions", headerName: "Actions", type: 'actions', width: 150, renderCell: (params) => (<UserActions {...{ params}} />)},
      {field:"TimeCreated", headerName: "Time Created", type: 'date', width: 100,valueGetter: (params) => new Date(params.value),}
    ];
   
    useEffect(() => {
      //console.log('Start useEffect');
      fetchData();
    }, [addUserShow]);
    
  return (
    <div>
      {addUserShow ? (<AddUser open={addUserShow} close={() => addUserClose()}/>) : null}
      <Box sx={{ height: 400, width: '100%' }} style={{width: '70%', marginLeft: 'auto', marginRight: 'auto', marginTop: '3%'}} >
        <Button 
          variant="contained" 
          style={{whiteSpace: 'nowrap', marginRight: '90%',border: '1px solid black', borderRadius: '10px'}}
          onClick={openAddUser}
        >Add User</Button>
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

export default Users