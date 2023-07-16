import * as React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
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
import logo from '../assets/images/logo.png';


const mdTheme = createTheme();



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
    const handleChangeSlider = (event, newValue) => {
      setNumberOfDays(newValue);
    };
    
    
    const [loading2, setLoading] = useState(false);

    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try{
            let response;
            const cachedData = localStorage.getItem('courseNames');
            if(cachedData) {
              response = {data: JSON.parse(cachedData)};
              console.log('data from cache');
            } else {
              response = await axios.get(
                'https://tm.nucoders.dev/getAllCourseNames',
              );
              localStorage.setItem('courseNames', JSON.stringify(response.data));
              console.log('data from server');
            }
            setData(response.data);
          } catch{
            console.log('error');
          }finally{
            setLoading(false);
          }
          
        };
        fetchData();
    }, []);

    const fullCoursesList = data ? data: null;
    const coursesList = [...new Set(fullCoursesList)];
    const [selectedCourse, setSelectedCourse] = React.useState();
    const [addedCourses, setAddedCourses]= React.useState([]);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    
    
    const [isClicked, setIsClicked] = React.useState(false);
    useEffect(() => {
      isClicked && setIsClicked(false);
   },[isClicked]);

   const [tables, setTables]= React.useState([]);

   const getData = async(course) => {
    setIsClicked(true);
    setLoading(true);
    console.log("in serarch one course");
    // localhost:8090/getCourseById this is the api link
    try{
      let response;
      

      response =  await axios.post('https://tm.nucoders.dev/getCourseById', 
      {
        "id": course,
      });
      console.log(response.data);
      setTables(response.data);
    } catch{
      console.log('error');
    }finally{
      setLoading(false);
    }

   };

   
  
  

  
   useEffect(() => {
 
  },[tables])

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
                                <Autocomplete disablePortal id="combo-box-demo" options={coursesList} inputValue = {selectedCourse} onChange={(event, newValue) => { setSelectedCourse(newValue); }}  renderInput={(params) => <TextField {...params}   label="Search Courses" />} />
                            </Grid>
                            <Grid item xs={3} md={4} lg={3}>
                                <Button sx={{backgroundColor: `#0077b6`}} variant="contained" onClick={() => {getData(selectedCourse.split(" ")[0]);}} >Search</Button>
                            </Grid>
                    </Grid>
                </Paper>
            </Grid>
              <Grid item xs={12} md={8} lg={9}>
                <Paper sx={{p: 2,display: 'flex',flexDirection: 'column',maxheight: 400,backgroundColor: `#0077b6`}}>
                    <Paper elevation={0} style={{minHeight: 400,maxHeight: 600, overflow: 'auto',backgroundColor: `#0077b6`}}>

                                <List>
                                  {tables && tables.map((course, index) => {
                                    console.log(course);
                                    let colors = {
                                        Lecture : '#3fb2ff',
                                        Lab : '#fd8230',
                                        Tutorial : '#00cc66',
                                        Project :  '#E61F12'
                                    }
                                    return (
                                    <Paper key  ={index} sx={{ borderRadius:25,m: 2, alignItems:'center'}} alignItems="center" justify="center">
                                        <Paper key  ={index} sx={{borderTopLeftRadius:15,borderTopRightRadius:15,borderBottomLeftRadius:0,borderBottomRightRadius:0,p:2, backgroundColor: "e0e6e7", alignItems:'center'}} alignItems="center" justify="center">

                                        <Typography> {course.courseId + " " + course.courseName} </Typography>
                                        {/* <Typography> Section: {course.section } </Typography> */}
                                        <Typography> {course.courseType + " " + course.section} </Typography>
                                        </Paper>
                                        <Paper key  ={index} sx={{borderTopLeftRadius:0,borderTopRightRadius:0,borderBottomLeftRadius:15,borderBottomRightRadius:15,p:2, backgroundColor: colors[course.courseType], alignItems:'center'}} alignItems="center" justify="center">

                                        {
                                            course.schedule && course.schedule.map((schedule, index) => {
                                                return (
                                                  <span>
                                                    <Typography> {schedule.dayDesc + " " + schedule.startTime + " - " + schedule.endTime} </Typography>
                                                    <Typography> {schedule.bldgName + " - Room " + schedule.roomId} </Typography>
                                                  </span>
                                                )
                                            })
                                        }
                                        <Typography> Instructor :{ (course.instructors && course.instructors[0].fullName) || 'NULL'}</Typography>
                                        {/* <Typography> Seats Left: {course.seatsLeft}</Typography> */}
                                        </Paper>
                                    </Paper>
                                    )
                                    
                                    })}
                                  {tables && tables.length === 0 && <Typography variant='h3' align="center" > Happy Day! </Typography>}
                                                                     
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

                  
                    <Typography  align="center">Number of days to go {numberOfDays}</Typography>
                    <Slider
                        aria-label="Temperature"
                        defaultValue={5}
                        valueLabelDisplay="auto"
                        step={1}
                        marks={marks}
                        min={1}
                        max={6}
                        value={numberOfDays}
                        onChange={handleChangeSlider}
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
                  <Button sx={{backgroundColor: `#0077b6`}} variant="contained" onClick={() => {}}  >Generate Tables</Button>
                </Paper> */}
              {/* </Grid>               */}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function SearchCourse() {
  return <DashboardContent />;
}