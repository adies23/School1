import React, { useState, useEffect } from 'react';
import Loading from '../component/Loading'
import axios from '../axios/axios';
import { Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, FormControlLabel, Button, FormGroup, Alert } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/de';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { deDE } from '@mui/x-date-pickers/locales';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from "moment";
import { format } from 'date-fns';

export default function AddUser  ({ open, close })  {
    const [isLoading, setIsLoading] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [validEmailMessage, setValidEmailMessage] = useState(null);

    //for alert message, delete if not work well
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [typeAlertMessage, setTypeAlertMessage] = useState('');
    //

    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState(''); 
    const [Birthday, setBirthday] = useState('');
    const [Email, setEmail] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [IsTeacher, setIsTeacher] = useState(false);
    const [IsManager, setIsManager] = useState(false);
    const onSubmit = async  (e) => {
        console.log('Start Submit');
        setIsLoading(true);
        e.preventDefault();
        const post = { 
            FirstName: FirstName, 
            LastName: LastName, 
            FullName: FirstName + ' ' + LastName, 
            Birthday: Birthday, 
            Email: Email, 
            PhoneNumber: PhoneNumber, 
            IsTeacher: IsTeacher, 
            IsManager: IsManager, 
        }
        console.log("post", JSON.stringify(post));
        addData(post);
    }

    const addData = async (data) => {
        console.log('Start add Data to users');
        const res = await axios.post('http://localhost:5000/api/users',data)
        .then(({ data }) => {
            const jsonData = JSON.stringify(data); 
            
            //for alert message, delete if not work well 
            if(data == 'Email already exists'){
                handleAlert(data,'error');
                console.log('Email already exists');
            }else{
                //handleAlert(data,'Success');
                setTypeAlertMessage('Success');
                setAlertMessage(data);                
                setOpenAlert(true);
                console.log('Added Successfuly');
            }
            // 
            alert(data);
        }).catch((e) => {
            setIsLoading(false);
            console.log(e);
        })

        setIsLoading(false);
        close(); 
        console.log('End add Data to users');
    }
    
    function validateEmail() {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        console.log('emailPattern.test(Email): ' + emailPattern.test(Email));
        setIsValidEmail(emailPattern.test(Email));
        if(emailPattern.test(Email)){
            console.log('isValidEmail == true');
            setValidEmailMessage(null);
        }else{
            console.log('isValidEmail == false');
            setValidEmailMessage('Email is invalid');
        }
    }
    
    //for alert message, delete if not work well
    //!!need to check why setAlertMessage doens't change state!!
    const handleAlert = (alertText,cc) => {
        console.log('Start handleAlert');
        console.log('alertText: ' + alertText);
        //setTypeAlertMessage(typeAlert);
        setAlertMessage(alertText);
        console.log('End handleAlert');
    };
    //

    //for alert message, delete if not work well
    useEffect(() => { 
        console.log('Star useEffect In addUser');
        if (alertMessage) {
            console.log('Exist alert message');
            setOpenAlert(true);
    
          // Close the alert after 3 seconds (adjust the timeout as needed)
          const timer = setTimeout(() => {
            console.log('Start setTimeout');
            setOpenAlert(false);
            setAlertMessage('');
          }, 3000);
    
          return () => clearTimeout(timer);
        }
        console.log('alertMessage: ' + alertMessage);
        console.log('End useEffect In addUser');
    }, [alertMessage]);
    //

    if(isLoading) {
        return <Loading />;
    }

    //for alert message, delete if not work well
    if(alertMessage){
        return <Alert onClose={() => setOpenAlert(false)} severity={typeAlertMessage}>
        {alertMessage}
      </Alert>; 
    }
    console.log('alertMessageEnd: ' + alertMessage);
    //
    const handleChangeBirthday = (newValue) => { 
        setBirthday(newValue.format('YYYY-MM-DD'));
      };
  return (
    <div className='container'>
        <Dialog PaperProps={{ sx: { borderRadius: "4%" } }} open={open} fullWidth maxWidth='sm'>
            <form onSubmit={onSubmit}>
                <DialogTitle>Add User</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} margin={2}>
                        <TextField variant='outlined' label='FirstName'
                            onChange={(event) => {
                                setFirstName(event.target.value)
                            }}
                            value={FirstName}>
                        </TextField>
                        <TextField variant='outlined' label='LastName'
                            onChange={(event) => {
                                setLastName(event.target.value)
                            }}
                            value={LastName}>                                
                        </TextField>
                        {/* <TextField variant='outlined' label='Birthday'
                            onChange={(event) => {
                                setBirthday(event.target.value)
                            }}
                            value={Birthday}>                                
                        </TextField>					 */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                <DatePicker
                                    variant='outlined' 
                                    label='Birthday'
                                    value={Birthday}
                                    onChange={handleChangeBirthday}>
                                </DatePicker>
                            </DemoContainer>
                        </LocalizationProvider>
                        <TextField variant='outlined' label='Email'
                            onChange={(event) => {
                                setEmail(event.target.value)
                            }}
                            value={Email}
                            onBlur={validateEmail}>                                
                        </TextField>
                        {validEmailMessage && <DialogContentText style={{color: 'red'}}>{validEmailMessage}</DialogContentText>}
                        <TextField variant='outlined' label='PhoneNumber'
                            onChange={(event) => {
                                setPhoneNumber(event.target.value)
                            }}
                            value={PhoneNumber}>                                
                        </TextField>
                        <FormGroup style={{display: 'inline'}}>
                            <FormControlLabel style={{width: '30%'}} control={<Checkbox onClick={(event) => setIsTeacher(event.target.checked)} />} label="IsTeacher" value={IsTeacher}/>
                            <FormControlLabel style={{width: '30%'}} control={<Checkbox onClick={(event) => setIsManager(event.target.checked)}/>} label="IsManager" value={IsManager}/>
                        </FormGroup>
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
