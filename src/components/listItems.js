import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import TableChartIcon from '@mui/icons-material/TableChart';
import RoomIcon from '@mui/icons-material/Room';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Link from '@mui/material/Link';
import SearchIcon from '@mui/icons-material/Search';
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
    {/* <ListSubheader component="div" inset>
      Profile
    </ListSubheader>
    

    <ListItemButton >
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Sign Out" />
    </ListItemButton> */}
  </React.Fragment>
);