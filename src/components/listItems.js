import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import LogoutIcon from '@mui/icons-material/Logout';
import TableChartIcon from '@mui/icons-material/TableChart';
import RoomIcon from '@mui/icons-material/Room';
import Link from '@mui/material/Link';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';

export const mainListItems = (
  <React.Fragment>
    {/* <Link href="/home" color="inherit" underline="none">
      <ListItemButton>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
    </Link> */}

    <Link href="/searchCourse" color="inherit" underline="none">
      <ListItemButton>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="Search Course" />
      </ListItemButton>
    </Link>

    <Link href="/tablemaker" color="inherit" underline="none">
      <ListItemButton>
        <ListItemIcon>
          <TableChartIcon />
        </ListItemIcon>
        <ListItemText primary="Table Maker" />
      </ListItemButton>
    </Link>
    
    <Link href="/roomlocator" color="inherit" underline="none">
      <ListItemButton>
        <ListItemIcon>
          <RoomIcon />
        </ListItemIcon>
        <ListItemText primary="Room Locator" />
      </ListItemButton>
    </Link>

    {/* <Link href="/nutips" color="inherit" underline="none">
      <ListItemButton>
        <ListItemIcon>
          <QuestionAnswerIcon />
        </ListItemIcon>
        <ListItemText primary="Nu Tips" />
      </ListItemButton>
    </Link> */}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
     <ListSubheader component="div" >
      Undergoing Maintenance
    </ListSubheader>
    <ListSubheader component="div" inset>
      Profile
    </ListSubheader>
    
    
    
    <ListItemButton >
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Sign Out" />
    </ListItemButton>

    <ListSubheader component="div" >
      For Developers
    </ListSubheader>

    <Link href="/signup" color="inherit" underline="none">
      <ListItemButton >
        <ListItemIcon>
          <AppRegistrationIcon />
        </ListItemIcon>
        <ListItemText primary="Register" />
      </ListItemButton>
    </Link>

    <Link href="/login" color="inherit" underline="none">
      <ListItemButton >
        <ListItemIcon>
          <LoginIcon />
        </ListItemIcon>
        <ListItemText primary="Login" />
      </ListItemButton>
    </Link>

    <Link href="/reset" color="inherit" underline="none">
    <ListItemButton >
      <ListItemIcon>
        <RestartAltIcon />
      </ListItemIcon>
      <ListItemText primary="Reset" />
    </ListItemButton>
    </Link>

  </React.Fragment>
);