import React, { useState, useEffect, forwardRef } from 'react';
import {Box, Button} from '@material-ui/core';
import axios from '../axios/axios';

import { DataGrid } from '@mui/x-data-grid';
import Users from '../component/Users';
import Courses from '../component/Courses';
import CoursesDetails from '../component/CoursesDetails';

function AdminPage() {  

    return (
        <div >
            <Users />
            <Courses />
            <CoursesDetails />
        </div>
    );
}

export default AdminPage;