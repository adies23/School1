import React, { useState, useEffect } from 'react';
import Loading from '../component/Loading'
import axios from '../axios/axios';
import { Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Button, FormGroup } from '@mui/material';

export default function AddCourse  ({ open, close })  {
    const [isLoading, setIsLoading] = useState(false);

    const [Name, setName] = useState('');
    const onSubmit = async  (e) => {
        console.log('Start Submit');
        setIsLoading(true);
        e.preventDefault();
        const post = { 
            Name: Name, 
        }
        console.log("post", JSON.stringify(post));
        addData(post);
    }

    const addData = async (data) => {
        console.log('Start add Data to courses');
        const res = await axios.post('http://localhost:5000/api/courses',data)
        .then(({ data }) => {
            const jsonData = JSON.stringify(data); 
            
            alert(data);
        }).catch((e) => {
            setIsLoading(false);
            console.log(e);
        })

        setIsLoading(false);
        close(); 
        console.log('End add Data to course');
    }    

    if(isLoading) {
        return <Loading />;
    }

  return (
    <div className='container'>
        <Dialog PaperProps={{ sx: { borderRadius: "4%" } }} open={open} fullWidth maxWidth='sm'>
            <form onSubmit={onSubmit}>
                <DialogTitle>Add Courses</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} margin={2}>
                        <TextField variant='outlined' label='Name'
                            onChange={(event) => {
                                setName(event.target.value)
                            }}
                            value={Name}>
                        </TextField>
                        <FormGroup style={{display: 'inline', marginTop: '12%'}}>
                            <Button type="submit" style={{width: '50%'}} variant='contained'>Submit</Button>
                            <Button style={{width: '50%'}} variant='outlined' onClick={close}>Close</Button>
                        </FormGroup>
                    </Stack>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </form>
        </Dialog>
    </div>
  )
}
