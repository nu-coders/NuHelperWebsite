import * as React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import useFetch from "react-fetch-hook";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Copyright from "./CopyRight";
import {AppBar,Drawer} from './AppBarDrawer';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { Slider } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import logo from '../assets/images/logo.png';

import Switch from '@mui/material/Switch';

const mdTheme = createTheme();

const marks = [
  {
      value: 0,
      label: '0',
  },
  {
      value: 1,
      label: '1',
  },
  {
      value: 2,
      label: '2',
  },
  {
      value: 3,
      label: '3',
  },
  {
      value: 4,
      label: '4',
  },
  {
      value: 5,
      label: '5',
  },
  {
      value: 6,
      label: '6',
  },    
]

function DashboardContent() {
    const [open, setOpen] = React.useState(true);
    const [section, setSections] = React.useState([]);
    const [coursesSections, setCoursesSections] = React.useState([]);
    const [numberOfDays, setNumberOfDays] = React.useState(5);
    const handleChange = async (event, course) => {
      let sectionValueNew = [...section];
      sectionValueNew[addedCourses.indexOf(course)] = event.target.value;
      setSections(sectionValueNew);
    };
    
    
    const [loading2, setLoading] = useState(false);
    const [emptyRooms, setEmptyRooms] = useState([]);
    const [data, setData] = useState([]);
    useEffect(() => {    
      function isOneDayOld(cachedData) {
        const { timestamp } = JSON.parse(cachedData);  
        const oneDayAgo = new Date(Date.now() - 1000 * 60 * 60 * 24);
        return oneDayAgo > new Date(timestamp);
      }
      const fetchData = async () => {
        setLoading(true); 
        try {       
          let response;       
          const cachedData = localStorage.getItem('rooms');
        
          if (cachedData && !isOneDayOld(cachedData)) {
            response = JSON.parse(cachedData);
            console.log('data from cache');     
          } else {  
            response = await axios.get(
              'https://rl.nucoders.dev/production/suglisttm',
            );
            localStorage.setItem('rooms', JSON.stringify({
               data: response.data,
               timestamp: Date.now()
            }));
            console.log('data from server');
          }
          
          setData(response.data);
        } catch {
          console.log('error');
        } finally {
          setLoading(false);
        }    
      };
      
      fetchData();          
 }, []);
        
        // const fetchEmptyRooms = async () => {
        //   setLoading(true);
        //   try{
        //     let response;
        //     const cachedData = localStorage.getItem('emptyRooms');
        //     if(cachedData) {
        //       response = {data: JSON.parse(cachedData)};
        //       console.log('data from cache');
        //     } else {
        //       response = await axios.get(
        //         '//localhost:8091/api/beta/getrooms/?day=0',
        //       );
        //       localStorage.setItem('emptyRooms', JSON.stringify(response.data));
        //       console.log('data from server' + response.data);
        //     }
        //     setEmptyRooms(response.data);
        //   } catch{
        //     console.log('error');
        //   }finally{
        //     setLoading(false);
        //   }

        // };
        // fetchEmptyRooms();
    //     fetchData();
    // }, []);

    const [rooms, setRooms] = useState([]);
    useEffect(() => {
      const fetchEmptyRooms = async () => {
        setLoading(true);
        try{
          let response;
          const cachedData = null;
          if(cachedData) {
            response = {data: JSON.parse(cachedData)};
            console.log('data from cache');
          } else {
            response = await axios.get(
              'https://rl.nucoders.dev/production/getrooms',
            );
            localStorage.setItem('emptyRooms', JSON.stringify(response.data));
            console.log('data from server' + response.data);
          }
          setEmptyRooms(response.data);
        } catch{
          console.log('error');
        }finally{
          setLoading(false);
        }

      };
      fetchEmptyRooms();
    }, []);


    const fullCoursesList = data ? data: null;
    const coursesList = [...new Set(fullCoursesList)];
    const [selectedCourse, setSelectedCourse] = React.useState();
    const [addedCourses, setAddedCourses]= React.useState([]);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const addCourse = async() => {
      let course = selectedCourse.split(" ")[0];
      let selectedCoursesTemp = [...addedCourses, course];
      let uniqeSelectedCoursesTemp = [...new Set(selectedCoursesTemp)];
      setAddedCourses(uniqeSelectedCoursesTemp );
    }
    const removeCourse = (course)=>{
    console.log('removed ' +course) 
      let sectionsNew = [...section];
      sectionsNew.splice(addedCourses.indexOf(course),1);
      setSections(sectionsNew);
      setAddedCourses(addedCourses.filter(code => code !== course));

  }
    const [isClicked, setIsClicked] = React.useState(false);
    useEffect(() => {
      isClicked && setIsClicked(false);
   },[isClicked]);

   const [tables, setTables]= React.useState([]);
   const [useFilters, setUseFilters] = React.useState(false);
   const [filters, setFilters] = React.useState({});
   const [noSelectedRoom, setNoSelectedRoom] = React.useState(true);
   const [currRoomTable, setCurrRoomTable] = React.useState([]);
   const getRoom = async () => {
    console.log("in get room");
    
    try{
        console.log("selected course is "+selectedCourse);
        let response;
      response =  await axios.get(`https://rl.nucoders.dev/production/getroom/?id=${selectedCourse.split("-")[1].trim()}`);
      console.log('data from server' + response.data);
      setCurrRoomTable(response.data);
      setNoSelectedRoom(false);
    } catch{
      console.log('error');
    }finally{
      setLoading(false);
    }

    
  };
  
  

  const [state, setState] = React.useState({
    sunday: true,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: false,
    saturday: false,
  });

  const handleChangeCheckbox = (event) => {
    console.log(event.target.name + ' ' + event.target.checked)
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const { sunday, monday, tuesday, wednesday, thursday, friday, saturday } = state;
  
  const [switchState, setSwitchState] = React.useState(false);
  const handleSwitch = (event) => {
    setSwitchState(event.target.checked);
    setUseFilters(event.target.checked);
    console.log(useFilters);
  };
   useEffect(() => {
 
  },[rooms])

  const details = (room) => {
    console.log(room.type);
    if(room.status === false){
      return (
        <Paper>
            
        <Typography variant="h6"  align="center"> {room['course']}</Typography>
        <Typography variant="h6"  align="center"> {room['type']}</Typography>
        <Typography variant="h6"  align="center"> {room['section']}</Typography>
        {/* <Typography variant="h6"  align="center"> {room[day.toString()][i.toString()]['status']}</Typography> */}
      </Paper>
      );
    }else {
      return (
        <Paper>
            
        <Typography variant="h6"  align="center"> Vacant</Typography>
      </Paper>
      );
    }
  }

  const ChildComponent = ({ room }) => {
    let date = new Date();
    let day = date.getDay();
    console.log(day)
    let today = room[day.toString()];
    return(
      <Paper>
        <Typography variant="h6"  align="center"> {room['1']}</Typography>
      </Paper>
    )
  };


const parseResult = (table) => {
  let result = {};
  let slots = {
    '0' : '8:30',
    '1' : '9:00',
    '2' : '9:30',
    '3' : '10:00',
    '4' : '10:30',
    '5' : '11:00',
    '6' : '11:30',
    '7' : '12:00',
    '8' : '12:30',
    '9' : '1:00',
    '10' : '1:30',
    '11' : '2:00',
    '12' : '2:30',
    '13' : '3:00',
    '14' : '3:30',
    '15' : '4:00',
    '16' : '4:30',
    '17' : '5:00',
    '18' : '5:30',
    '19' : '6:00',
    '20' : '6:30',
    '21' : '7:00',
    '22' : '7:30',
    '23' : '8:00',
    '24' : '8:30',
    '25' : '9:00',
  }
  Object.keys(table).map((key) => {
    let newKey = '0';
    let nextKey = (parseInt(key)+1).toString();
    let currSlot = table[key];
    let nextSlot = table[nextKey];
    console.log(key +"curr slot is "+ JSON.stringify(currSlot))
    console.log(nextKey + "next slot is "+ JSON.stringify(nextSlot))
    //add curr slot if the next slot is undefined
    if(nextSlot === undefined){
      result[key] = currSlot;
      result[key]['startSlot'] = slots[key];
      result[key]['endSlot'] = slots[key];
    } else {
    //merge 2 slots if there status is both true 

      if(currSlot['status'] === true && nextSlot['status'] === true){
        result[newKey] = currSlot;
        result[newKey]['startSlot'] = slots[key];
        result[newKey]['endSlot'] = slots[nextKey];
      } 
      //add curr slot if it is false and next slot is true
      if(currSlot['status'] === false && nextSlot['status'] === true){
        result[newKey] = currSlot;
        result[newKey]['startSlot'] = slots[key];
        result[newKey]['endSlot'] = slots[key];
        newKey = (parseInt(newKey)+1).toString();
      }
      //add curr slot if it is true and next slot is false
      if(currSlot['status'] === true && nextSlot['status'] === false){
        result[newKey] = currSlot;
        result[newKey]['startSlot'] = slots[key];
        result[newKey]['endSlot'] = slots[key];
        newKey = (parseInt(newKey)+1).toString();
      } 
      if(currSlot['status'] === false && nextSlot['status'] === false){
        if(currSlot['course'] === nextSlot['course'] && currSlot['section'] === nextSlot['section'] ){
          result[newKey] = currSlot;
          result[newKey]['startSlot'] = slots[key];
          result[newKey]['endSlot'] = slots[nextKey];
        } else {
          result[newKey] = currSlot;
          result[newKey]['startSlot'] = slots[key];
          result[newKey]['endSlot'] = slots[key];
        }
      }
    }
  })
  console.log(result);
  return result;

}



  const parseTable = (table) => {
    let table2 = parseResult(table);
    let colors = {
      Occupied : '#FF0000',
      Vacant : '#00FF00',
    } 
    
    return (
      <Paper>
        {Object.keys(table2).map((key) => (
          <Paper key ={key} sx={{ p:2, m: 2, backgroundColor: colors[table[key].status ? 'Vacant' : 'Occupied'], alignItems:'center'}} alignItems="center" justify="center">
          <Typography variant="h6"  align="center">Status: {table[key].status ? 'Vacant' : 'Occupied'}</Typography>
          <Typography variant="h6"  align="center">Occupied Until: {table[key]['O/V']}</Typography> 
          {!table[key].status && (
            <>
              <Typography variant="h6"  align="center">Course: {table[key]['course']}</Typography>
              <Typography variant="h6"  align="center">Section: {table[key]['section']}</Typography>
            </>
          )}
        </Paper>
        ))}
      </Paper>
    );
  }

  // const parseTable = (table) => {
  //   let colors = {
  //     Occupied : '#FF0000',
  //     Vacant : '#00FF00',
  //   } 
    
  //   let startDate = new Date();
  //   startDate.setHours(8);
  //   startDate.setMinutes(30);
  //   let endDate = new Date();
  //   endDate.setHours(16);
  //   endDate.setMinutes(30);
  //   let timeIntervals = [];
  //   while(startDate < endDate) {
  //     let startTime = startDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  //     startDate.setMinutes(startDate.getMinutes() );
  //     let endTime = startDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  //     timeIntervals.push(startTime + ' - ' + endTime);
  //   }
    
  //   return (
  //     <Paper>
  //       {Object.keys(table).map((key) => {
  //         if(table[key].status) {
  //           return (
  //             <Paper key={key} sx={{ p:2, m: 2, backgroundColor: colors['Occupied'], alignItems:'center', color: '#FFFFFF' }} alignItems="center" justify="center">
  //               <Typography variant="h6" align="center">Status: Occupied</Typography>
  //               <Typography variant="h6" align="center">Occupied Until: {table[key]['O/V']}</Typography>
  //               <Typography variant="h6" align="center">Course: {table[key]['course']}</Typography>
  //               <Typography variant="h6" align="center">Type: {table[key]['type']}</Typography>
  //               <Typography variant="h6" align="center">Section: {table[key]['section']}</Typography>
  //               <Typography variant="h6" align="center">Start Time: {timeIntervals[key - 1]}</Typography>
  //               <Typography variant="h6" align="center">End Time: {timeIntervals[key]}</Typography>
  //             </Paper>
  //           );
  //         } else {
  //           return (
  //             <Paper key={key} sx={{ p:2, m: 2, backgroundColor: colors['Vacant'], alignItems:'center', color: '#FFFFFF' }} alignItems="center" justify="center">
  //               <Typography variant="h6" align="center">Status: Vacant</Typography>
  //               <Typography variant="h6" align="center">Occupied Until: {table[key]['O/V']}</Typography>
  //             </Paper>
  //           );
  //         }
  //       })}
  //     </Paper>
  //   );
  // }
  
  return (    
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} style={{backgroundColor:`#03045e`}}>
          <Toolbar sx={{ pr: '24px'}} >
            <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer} sx={{ marginRight: '36px', ...(open && { display: 'none' }), }} >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }} >
              NU Smart Helper
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}style={{background:`#03045e`}} >
          <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1],backgroundColor:`#03045e` }} >
          <img src={logo} alt="logo" style={{ width: "180px", height:"60px" }} />

            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon style={{color:`#fff`}}/>
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav" >
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box component="main" sx={{ backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900], flexGrow: 1, height: '100vh', overflow: 'auto', }} >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Search Courses */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper sx={{p: 2,display: 'flex',flexDirection: 'column',maxheight: 400,overflow: 'auto',backgroundColor: `#caf0f8`}}>
                    <Grid container spacing={3} >

                        <Grid item xs={9} md={8} lg={9} >
                                <Autocomplete disablePortal id="combo-box-demo" options={coursesList} inputValue = {selectedCourse} onChange={(event, newValue) => { setSelectedCourse(newValue); }}  renderInput={(params) => <TextField {...params}   label="Search Rooms" />} />
                            </Grid>
                            <Grid item xs={3} md={4} lg={3}>
                                <Button sx={{backgroundColor: `#0077b6`}} variant="contained" onClick={() => {getRoom();}} >Search</Button>
                            </Grid>
                    </Grid>
                </Paper>
            </Grid>
              <Grid item xs={12} md={8} lg={9}>
                <Paper sx={{p: 2,display: 'flex',flexDirection: 'column',maxheight: 400,backgroundColor: `#0077b6`}}>
                    <Paper elevation={0} style={{minHeight: 400,maxHeight: 600, overflow: 'auto',backgroundColor: `#0077b6`}}>

                                <List>
                                
                                  {currRoomTable && currRoomTable.map((room) => {
                                    let colors = {
                                      Occupied : '#FF3300',
                                      Vacant : '#00FF00',
                                    } 
                                      return(
                                        <Paper key= {room['id']} sx={{ p:2, m: 2,backgroundColor: '#0077b6', alignItems:'center'}} alignItems="center" justify="center">
                                          <Paper sx={{ backgroundColor: '#fff', alignItems:'center'}}>
                                            <Typography variant="h6"  align="center">Room {room['id']} </Typography>
                                            <Typography variant="h6"  align="center"> {room['floor']}</Typography>
                                            <Typography variant="h6"  align="center"> {room['type']}</Typography>
                                          </Paper>
                                          <Paper sx={{ mb:2,backgroundColor: colors[room.currentSlot.status ? 'Vacant' : 'Occupied'], alignItems:'center'}}>
                                            {/* {parseTable(room['table'])} */}
                                              <Typography variant="h6"  align="center">Status: {room.currentSlot.status ? 'Vacant' : 'Occupied'}</Typography>
                                              <Typography variant="h6"  align="center">Occupied Until: {room.currentSlot['O/V']}</Typography> 
                                              {!room.currentSlot.status && (
                                                <>
                                                  <Typography variant="h6"  align="center">Course: {room.currentSlot['course']}</Typography>
                                                  <Typography variant="h6"  align="center">Section: {room.currentSlot['section']}</Typography>
                                                </>
                                              )}
                                            </Paper>
                                          </Paper>
                                    )
                                  })}
                                 
                                  {
                                    noSelectedRoom && emptyRooms && emptyRooms.map((room) => {
                                      
                                      return(
                                        <Paper key= {room['id']} sx={{ borderRadius:15,m:5,backgroundColor: '#0077b6', alignItems:'center'}} alignItems="center" justify="center">

                                          <Paper sx={{ p:2,backgroundColor: '#fff', alignItems:'center',borderTopLeftRadius:15,borderTopRightRadius:15,borderBottomLeftRadius:0,borderBottomRightRadius:0}}>
                                            <Typography variant="h6"  align="center">Room {room['id']} </Typography>
                                            <Typography variant="h6"  align="center"> {room['floor']}</Typography>
                                            <Typography variant="h6"  align="center"> {room['type']}</Typography>
                                          </Paper>
                                          <Paper sx={{p:2, mb:2,backgroundColor: '#12E615', alignItems:'center',borderTopLeftRadius:0,borderTopRightRadius:0,borderBottomLeftRadius:15,borderBottomRightRadius:15}}>
                                            {/* {parseTable(room['table'])} */}
                                              <Typography variant="h6"  align="center">Status: Vacant</Typography>
                                              <Typography variant="h6"  align="center">Occupied Until: {room.currentSlot['O/V']}</Typography> 
                                            </Paper>
                                          </Paper>
                                    )
                                  })
                                  }
                                  

                                                                     
                                </List>
                    </Paper>
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              {/* <Grid item  xs={12} md={4} lg={3} sx={{flexDirection:'row'}}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight:350 ,backgroundColor: `#caf0f8` }}>
                  <List>
                    <Typography variant="h6"  align="center">Added Courses</Typography>
                    <Divider/>
                    {addedCourses && addedCourses.map((course) => (
                        <ListItem key={course}>
                            <ListItemText primary={course} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => {removeCourse(course);}}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}

      
      
      
                  
                  </List>
                </Paper>
                <Paper sx={{ m:1, p: 2, display: 'flex', flexDirection: 'column', backgroundColor: `#caf0f8` }}>
                  
                  
                  <FormControl component="fieldset" variant="standard">
                    <FormControlLabel
                      control={
                        <Switch checked={switchState} onChange={handleSwitch} inputProps={{ 'aria-label': 'controlled',  }} color="secondary" />
                      }
                      label='Filters'
                    />

                  
                    <Typography  align="center">Number of days to go </Typography>
                    <Slider
                        aria-label="Temperature"
                        defaultValue={5}
                        valueLabelDisplay="auto"
                        step={1}
                        marks={marks}
                        min={1}
                        max={6}
                    />
                            <FormGroup>

                              <FormControlLabel control={
                                <Checkbox checked={sunday} onChange={handleChangeCheckbox} name="sunday" />
                                } label="Sunday" />
                              
                              <FormControlLabel control={
                                <Checkbox checked={monday} onChange={handleChangeCheckbox} name="monday" />
                                } label="Monday" />
                              
                              <FormControlLabel control={
                                <Checkbox checked={tuesday} onChange={handleChangeCheckbox} name="tuesday" />
                                } label="Tuesday" />
                              
                              <FormControlLabel control={
                                <Checkbox checked={wednesday} onChange={handleChangeCheckbox} name="wednesday" />
                                } label="Wednesday" />
                              
                              <FormControlLabel control={
                                <Checkbox checked={thursday} onChange={handleChangeCheckbox} name="thursday" />
                                } label="Thursday" />

                         
                          
                            </FormGroup>
                          
                                
                    </FormControl>
                </Paper>
                <Paper sx={{ m:1, p: 2, display: 'flex', flexDirection: 'column', backgroundColor: `#caf0f8` }}>
                  <Button sx={{backgroundColor: `#0077b6`}} variant="contained" onClick={() => {getRoom();}}  >Generate Tables</Button>
                </Paper>
              </Grid>               */}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function RoomLocator() {
  return <DashboardContent />;
}