import React, { useState, useEffect, forwardRef } from 'react';
import {Box, Button} from '@material-ui/core';
import axios from '../axios/axios';

import { DataGrid } from '@mui/x-data-grid';
import Users from '../component/Users';
import Courses from '../component/Courses';
import CoursesDetails from '../component/CoursesDetails';
import StudyFields from '../component/StudyField';

function AdminPage() {  

    return (
        <div >
            <Users />
            <StudyFields />
            <Courses />
            <CoursesDetails />
        </div>
    );
}

export default AdminPage;