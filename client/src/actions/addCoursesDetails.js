import React, { useState, useEffect } from 'react';
import Loading from '../component/Loading'
import axios from '../axios/axios';
import { Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Button, FormGroup, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/de';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function AddCoursesDetails  ({ open, close })  {
    const [isLoading, setIsLoading] = useState(false);

    const [Name, setName] = useState('');
    const [StartDate, setStartDate] = useState('');
    const [CourseId, setCourseId] = useState(-1);
    const [TeacherId, setTeacherId] = useState(-1); 
    
    const [tableData, setTableData]=useState([]);
    const [tableCourseData, setTableCourseData]=useState([]);
    
    
    const userQuery = { 
      State: 1,
      IsTeacher: 1, 
    }
    const fetchData = () => {
        console.log('Start fetchData Users forAddCourseDetails');
        axios.get('http://localhost:5000/api/Users/forAddCourseDetails?isTeacher=true')
        .then(({ data }) => {
            const jsonData = JSON.stringify(data);  
            setTableData(data); 
            console.log('Data: ' + JSON.stringify(data));     
            console.log('Finish fetchData Users forAddCourseDetails');
        }).catch((e) => {
            console.log(e);
        })
        //console.log('End fetchDataCoursesDetails');
    }
    
    const onSubmit = async  (e) => {
        console.log('Start Submit');
        setIsLoading(true);
        e.preventDefault();
        const post = { 
            Name: Name, 
            StartDate: StartDate, 
            CourseId: CourseId, 
            TeacherId: TeacherId, 
        }
        console.log("post", JSON.stringify(post));
        addData(post); 
    }

    const addData = async (data) => {
        console.log('Start add Data to Courses Details');
        const res = await axios.post('http://localhost:5000/api/coursesDetails',data)
        .then(({ data }) => {
            const jsonData = JSON.stringify(data); 
            
            alert(data);
        }).catch((e) => {
            setIsLoading(false);
            console.log(e);
        })

        setIsLoading(false);
        close(); 
        console.log('End add Data to Courses Details');
    } 

    const courseData = () => {
        //console.log('Start fetchData Courses');
        axios.get('http://localhost:5000/api/Courses')
        .then(({ data }) => {
            const jsonData = JSON.stringify(data);  
            console.log('JSON.stringify(data): ' + JSON.stringify(data));
            setTableCourseData(data); 
        }).catch((e) => {
            console.log(e);
        })
        //console.log('End fetchData Courses');
    }
    
    const handleChangeStartDate = (newValue) => { 
        setStartDate(newValue.format('YYYY-MM-DD'));
    };   
    
    const handleSelectTeacher = (event) => {
        setTeacherId(event.target.value);
    };
    
    const handleSelectCourse = (event) => {
        setCourseId(event.target.value);
    };

    useEffect(() => {
        setIsLoading(true);
        fetchData();
        courseData();
        setIsLoading(false);
      },[])

    if(isLoading) {
        return <Loading />;
    }

  return (
    <div className='container'>
        <Dialog PaperProps={{ sx: { borderRadius: "4%" } }} open={open} fullWidth maxWidth='sm'>
            <form onSubmit={onSubmit}>
                <DialogTitle>Add Courses Details</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} margin={2}>
                        <TextField variant='outlined' label='Name'
                            onChange={(event) => {
                                setName(event.target.value)
                            }}
                            value={Name}>
                        </TextField>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                <DatePicker
                                    variant='outlined' 
                                    label='StartDate'
                                    value={StartDate}
                                    onChange={handleChangeStartDate}>
                                </DatePicker>
                            </DemoContainer>
                        </LocalizationProvider>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Course</InputLabel>
                            <Select
                                variant='outlined'
                                labelId='select-label'
                                label='Select Course'
                                defaultValue={-1}
                                id="mySelect"
                                value={CourseId}
                                onChange={handleSelectCourse}
                                >
                                <MenuItem disabled value={-1}>No value selected</MenuItem>
                                    {tableCourseData.map((course) => (
                                        <MenuItem key={course.Id} value={course.Id}>
                                            {course.Name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Teacher</InputLabel>
                            <Select
                                variant='outlined'
                                labelId='select-label'
                                label='Select User'
                                defaultValue={-1}
                                id="mySelect"
                                value={TeacherId}
                                onChange={handleSelectTeacher}
                                >
                                <MenuItem disabled value={-1}>No value selected</MenuItem>
                                {tableData.map((userName) => (
                                    <MenuItem key={userName.Id} value={userName.Id}>
                                        {userName.FullName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
