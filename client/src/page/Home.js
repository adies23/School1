import React, { useEffect, useState } from 'react';
import {Button,TextField, Typography} from "@material-ui/core";

function Home() {
  return (
    <div className=' ContactUs Box'>
        ssd
        <Typography>Contact Us</Typography>
        <TextField  label="Name" variant='outlined'/>
        <Button>Send</Button>
        <Button>Cancel</Button>
    </div>
  )
}

export default Home